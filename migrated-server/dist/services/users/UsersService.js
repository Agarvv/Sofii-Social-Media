"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlockRepository_1 = __importDefault(require("@repositories/user/BlockRepository"));
const FollowerRepository_1 = __importDefault(require("@repositories/user/FollowerRepository"));
const FriendRepository_1 = __importDefault(require("@repositories/user/FriendRepository"));
const User_1 = __importDefault(require("@models/users/User"));
const CustomError_1 = __importDefault(require("@outils/CustomError"));
const NotificationsService_1 = __importDefault(require("@services/notifications/NotificationsService"));
const websocket_1 = __importDefault(require("@websocket/websocket"));
class UsersService {
    static async blockOrUnblock(blockedId, blockerId) {
        if (blockedId === blockerId)
            throw new CustomError_1.default("You can't block yourself.", 400);
        const target = await User_1.default.findOne({ where: { id: blockedId } });
        if (!target)
            throw new CustomError_1.default('User to block not found.', 404);
        const existingBlock = await BlockRepository_1.default.getBlocked(blockedId, blockerId);
        if (existingBlock) {
            await existingBlock.destroy();
            return 'UNBLOCKED';
        }
        await this.destroyAnySocialRelations(blockedId, blockerId);
        await BlockRepository_1.default.block(blockerId, blockedId);
        return 'BLOCKED';
    }
    static async followOrUnfollow(followedId, follower) {
        if (followedId === follower.user_id)
            throw new CustomError_1.default("You can't follow yourself.", 400);
        const follow = await FollowerRepository_1.default.getFollow(follower.user_id, followedId);
        const io = websocket_1.default.getIO();
        if (follow) {
            await follow.destroy();
            io.emit('unfollowedUser', follow);
            return 'UNFOLLOWED';
        }
        const newFollow = await FollowerRepository_1.default.follow(follower.user_id, followedId);
        io.emit('newFollower', newFollow);
        await NotificationsService_1.default.sendNotificationToUser(followedId, follower.username, follower.user_id, newFollow, null, 'NEW_FOLLOWER');
        return 'FOLLOWED';
    }
    static async getFriendsAndRequests(userId) {
        const friends = await FriendRepository_1.default.getUserFriends(userId);
        const requests = await FriendRepository_1.default.getUserFriendRequests(userId);
        return { friends, requests };
    }
    static async sendFriendRequest(receiverId, sender) {
        const existingRequest = await FriendRepository_1.default.getFriendRequest(sender.user_id, receiverId);
        if (existingRequest)
            throw new CustomError_1.default('You have already sent a friend request to this user.', 400);
        const existingFriend = await FriendRepository_1.default.getFriend(sender.user_id, receiverId);
        if (existingFriend)
            throw new CustomError_1.default('You are already friends with this user.', 409);
        const friendRequest = await FriendRepository_1.default.friendRequest(sender.user_id, receiverId);
        await NotificationsService_1.default.sendNotificationToUser(receiverId, sender.username, sender.user_id, friendRequest, null, 'FRIEND_REQUEST');
    }
    static async denyFriendRequest(requestId, user) {
        const friendRequest = await FriendRepository_1.default.getFriendRequestById(requestId);
        if (!friendRequest)
            throw new CustomError_1.default('Friend request not found.', 404);
        if (friendRequest.friend_target !== user.user_id) {
            throw new CustomError_1.default('You are not authorized to deny this friend request.', 401);
        }
        await friendRequest.destroy();
    }
    static async acceptFriendRequest(requestId, user) {
        const friendRequest = await FriendRepository_1.default.getFriendRequestById(requestId);
        if (!friendRequest)
            throw new CustomError_1.default('Friend request not found.', 404);
        if (friendRequest.friend_target !== user.user_id) {
            throw new CustomError_1.default('You are not authorized to accept this friend request.', 401);
        }
        await FriendRepository_1.default.friends(friendRequest.request_sender_id, friendRequest.friend_target);
        await friendRequest.destroy();
        await NotificationsService_1.default.sendNotificationToUser(friendRequest.request_sender_id, user.username, user.user_id, friendRequest, null, 'ACCEPTED_FRIEND_REQUEST');
    }
    static async destroyAnySocialRelations(userId1, userId2) {
        await FriendRepository_1.default.unfriends(userId1, userId2);
        await FollowerRepository_1.default.unfollow(userId1, userId2);
    }
}
exports.default = UsersService;
