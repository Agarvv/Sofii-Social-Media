"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Friends_1 = __importDefault(require("@models/users/Friends"));
const FriendRequest_1 = __importDefault(require("@models/users/FriendRequest"));
const User_1 = __importDefault(require("@models/users/User"));
const sequelize_1 = require("sequelize");
class FriendRepository {
    static async getUserFriendRequests(userId) {
        return await FriendRequest_1.default.findAll({
            where: {
                friend_target: userId
            },
            include: [
                {
                    model: User_1.default,
                    as: 'sender'
                }
            ]
        });
    }
    static async getUserFriends(userId) {
        const userFriends = await Friends_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { friend_one_id: userId },
                    { friend_two_id: userId }
                ]
            },
            include: [
                { model: User_1.default, as: 'friendOne' },
                { model: User_1.default, as: 'friendTwo' }
            ]
        });
        return userFriends.map(userFriend => {
            const isFriendOne = userId === userFriend.friendOne.id;
            return { friend: isFriendOne ? userFriend.friendTwo : userFriend.friendOne };
        });
    }
    static async friendRequest(sender, receiver) {
        return await FriendRequest_1.default.create({
            request_sender_id: sender,
            friend_target: receiver
        });
    }
    static async friends(oneId, twoId) {
        await Friends_1.default.create({
            friend_one_id: oneId,
            friend_two_id: twoId
        });
    }
    static async unfriends(oneId, twoId) {
        await Friends_1.default.destroy({
            where: {
                [sequelize_1.Op.or]: [
                    { friend_one_id: oneId, friend_two_id: twoId },
                    { friend_one_id: twoId, friend_two_id: oneId }
                ]
            }
        });
        await FriendRequest_1.default.destroy({
            where: {
                [sequelize_1.Op.or]: [
                    { request_sender_id: oneId, friend_target: twoId },
                    { request_sender_id: twoId, friend_target: oneId }
                ]
            }
        });
    }
    static async getFriendRequest(sender, receiver) {
        return await FriendRequest_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    { request_sender_id: sender, friend_target: receiver },
                    { request_sender_id: receiver, friend_target: sender }
                ]
            }
        });
    }
    static async getFriendRequestById(id) {
        return await FriendRequest_1.default.findOne({
            where: {
                id: id
            }
        });
    }
    static async getFriend(oneId, twoId) {
        return await Friends_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    { friend_one_id: oneId, friend_two_id: twoId },
                    { friend_one_id: twoId, friend_two_id: oneId }
                ]
            }
        });
    }
}
exports.default = FriendRepository;
