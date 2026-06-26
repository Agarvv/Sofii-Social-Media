"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SavedPost_1 = __importDefault(require("@models/posts/SavedPost"));
const Post_1 = __importDefault(require("@models/posts/Post"));
const User_1 = __importDefault(require("@models/users/User"));
const Likes_1 = __importDefault(require("@models/posts/Likes"));
const Comment_1 = __importDefault(require("@models/posts/comments/Comment"));
class SavedRepository {
    static async getSaved(postId, userId) {
        return SavedPost_1.default.findOne({
            where: {
                user_id: userId,
                post_id: postId
            }
        });
    }
    static async getSaveds(userId) {
        const saveds = await SavedPost_1.default.findAll({
            where: {
                user_id: userId
            },
            include: [{
                    model: Post_1.default,
                    as: 'saved_post',
                    include: [
                        {
                            model: User_1.default,
                            as: 'user',
                            attributes: ['username', 'profilePicture', 'id']
                        },
                        {
                            model: Comment_1.default,
                            as: 'postComments',
                            attributes: ['comment_content'],
                            include: [
                                {
                                    model: User_1.default,
                                    as: 'commentUser',
                                    attributes: ['username', 'profilePicture', 'id']
                                }
                            ]
                        },
                        {
                            model: Likes_1.default,
                            as: 'postLikes'
                        },
                        {
                            model: SavedPost_1.default,
                            as: 'saved_post'
                        }
                    ]
                }]
        });
        return saveds;
    }
}
exports.default = SavedRepository;
