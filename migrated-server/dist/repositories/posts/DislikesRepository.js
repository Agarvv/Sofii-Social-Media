"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommentDislikes_1 = __importDefault(require("@models/posts/comments/CommentDislikes"));
const CommentAwnsersDislikes_1 = __importDefault(require("@models/posts/comments/CommentAwnsersDislikes"));
class DislikesRepository {
    static async getCommentDislike(userId, postId, commentId) {
        return await CommentDislikes_1.default.findOne({
            where: {
                user_id: userId,
                comment_id: commentId,
                post_id: postId
            }
        });
    }
    static async getAnswerDislike(userId, postId, commentId, answerId) {
        return await CommentAwnsersDislikes_1.default.findOne({
            where: {
                user_id: userId,
                comment_id: commentId,
                post_id: postId,
                awnser_id: answerId
            }
        });
    }
}
exports.default = DislikesRepository;
