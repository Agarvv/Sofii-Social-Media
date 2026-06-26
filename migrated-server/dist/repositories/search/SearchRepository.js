"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("@models/posts/Post"));
const User_1 = __importDefault(require("@models/users/User"));
const sequelize_1 = require("sequelize");
const Likes_1 = __importDefault(require("@models/posts/Likes"));
const SavedPost_1 = __importDefault(require("@models/posts/SavedPost"));
const Comment_1 = __importDefault(require("@models/posts/comments/Comment"));
const Followers_1 = __importDefault(require("@models/users/Followers"));
const Friends_1 = __importDefault(require("@models/users/Friends"));
class SearchRepository {
    static async search(query) {
        const postsResults = await Post_1.default.findAll({
            where: {
                description: {
                    [sequelize_1.Op.like]: `%${query}%`
                }
            },
            include: [
                {
                    model: User_1.default,
                    as: 'user'
                },
                {
                    model: Likes_1.default,
                    as: 'postLikes'
                },
                {
                    model: Comment_1.default,
                    as: 'postComments'
                },
                {
                    model: SavedPost_1.default,
                    as: 'saved_post'
                }
            ]
        });
        const usersResults = await User_1.default.findAll({
            where: {
                username: {
                    [sequelize_1.Op.like]: `%${query}%`
                }
            },
            include: [
                {
                    model: User_1.default,
                    as: 'followers',
                    through: { model: Followers_1.default, as: 'follower' }
                },
                {
                    model: User_1.default,
                    as: 'friends',
                    through: { model: Friends_1.default, as: 'friends' }
                }
            ]
        });
        return { posts: postsResults, users: usersResults };
    }
}
exports.default = SearchRepository;
