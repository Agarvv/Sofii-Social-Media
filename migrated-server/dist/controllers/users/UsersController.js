"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersService_1 = __importDefault(require("@services/users/UsersService"));
const NotificationsService_1 = __importDefault(require("@services/notifications/NotificationsService"));
class UsersController {
    static async blockOrUnblock(req, res) {
        const { userId } = req.body;
        const blockedOrUnblocked = await UsersService_1.default.blockOrUnblock(userId, req.account.user_id);
        res.status(200).json({
            message: blockedOrUnblocked
        });
    }
    static async followOrUnfollow(req, res) {
        const { userId } = req.body;
        const followedOrUnfollowed = await UsersService_1.default.followOrUnfollow(userId, req.account);
        res.status(200).json({
            message: followedOrUnfollowed
        });
    }
    static async getNotifications(req, res) {
        const notifications = await NotificationsService_1.default.getUserNotifications(req.account.user_id);
        res.status(200).json({
            notifications: notifications
        });
    }
    static async deleteNotification(req, res) {
        const id = Number(req.params.id);
        await NotificationsService_1.default.deleteUserNotification(id, req.account.user_id);
        res.status(200).json({
            message: "¡Notification Deleted!"
        });
    }
    static async getFriendsAndRequests(req, res) {
        const data = await UsersService_1.default.getFriendsAndRequests(req.account.user_id);
        res.status(200).json({
            data: data
        });
    }
    static async sendFriendRequest(req, res) {
        const { userId } = req.body;
        await UsersService_1.default.sendFriendRequest(userId, req.account);
        res.status(200).json({
            message: "¡Friend Request Send!"
        });
    }
    static async denyFriendRequest(req, res) {
        const { requestId } = req.body;
        await UsersService_1.default.denyFriendRequest(requestId, req.account);
        res.status(200).json({
            message: "¡Friend Request Denied!"
        });
    }
    static async acceptFriendRequest(req, res) {
        const { requestId } = req.body;
        await UsersService_1.default.acceptFriendRequest(requestId, req.account);
        res.status(200).json({
            message: "¡Friend Request Accepted!"
        });
    }
}
exports.default = UsersController;
