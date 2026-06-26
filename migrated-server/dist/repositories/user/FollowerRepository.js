"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Followers_1 = __importDefault(require("@models/users/Followers"));
const sequelize_1 = require("sequelize");
class FollowerRepository {
    static async follow(followerId, followedId) {
        return await Followers_1.default.create({
            follower_id: followerId,
            following_id: followedId
        });
    }
    static async unfollow(followerId, followedId) {
        await Followers_1.default.destroy({
            where: {
                [sequelize_1.Op.or]: [
                    { follower_id: followerId, following_id: followedId },
                    { follower_id: followedId, following_id: followerId }
                ]
            }
        });
    }
    static async getFollow(followerId, followedId) {
        return await Followers_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    { follower_id: followerId, following_id: followedId },
                    { follower_id: followedId, following_id: followerId }
                ]
            }
        });
    }
}
exports.default = FollowerRepository;
