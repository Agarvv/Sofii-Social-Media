"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Likes_1 = __importDefault(require("@models/posts/Likes"));
const CommentLikes_1 = __importDefault(require("@models/posts/comments/CommentLikes"));
const CommentAwnsersLikes_1 = __importDefault(require("@models/posts/comments/CommentAwnsersLikes"));
class LikesRepository {
    static async getPostLike(postId, userId) {
        return await Likes_1.default.findOne({
            where: {
                user_id: userId,
                post_id: postId
            }
        });
    }
    static async getCommentLike(userId, postId, commentId) {
        return await CommentLikes_1.default.findOne({
            where: {
                user_id: userId,
                comment_id: commentId,
                post_id: postId
            }
        });
    }
    static async getAnswerLike(userId, postId, commentId, answerId) {
        return await CommentAwnsersLikes_1.default.findOne({
            where: {
                user_id: userId,
                post_id: postId,
                comment_id: commentId,
                awnser_id: answerId
            }
        });
    }
}
exports.default = LikesRepository;
