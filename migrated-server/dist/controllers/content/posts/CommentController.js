"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommentService_1 = __importDefault(require("@services/content/posts/CommentService"));
class CommentController {
    static async comment(req, res) {
        const { commentValue, postId } = req.body;
        await CommentService_1.default.comment(commentValue, postId, req.account);
        res.status(201).json({
            "message": "¡Comment Created!"
        });
    }
    static async likeComment(req, res) {
        const { commentId, postId } = req.body;
        const likedOrUnliked = await CommentService_1.default.likeOrUnlikeComment(commentId, postId, req.account);
        res.status(200).json({
            "message": likedOrUnliked
        });
    }
    static async dislikeComment(req, res) {
        const { commentId, postId } = req.body;
        const userId = req.account.user_id;
        const dislikedOrUndisliked = await CommentService_1.default.dislikeOrUndislikeComment(commentId, postId, userId);
        res.status(200).json({
            "message": dislikedOrUndisliked
        });
    }
    static async answerComment(req, res) {
        const { answerValue, commentId, postId } = req.body;
        await CommentService_1.default.answerComment(commentId, postId, req.account, answerValue);
        res.status(201).json({
            "message": "¡Comment Answered!"
        });
    }
    static async likeCommentAnswer(req, res) {
        const { commentId, answerId, postId } = req.body;
        const userId = req.account.user_id;
        const likedOrUnliked = await CommentService_1.default.likeOrUnlikeAnswer(answerId, commentId, postId, userId);
        res.status(201).json({
            "message": likedOrUnliked
        });
    }
    static async dislikeCommentAnswer(req, res) {
        const { commentId, answerId, postId } = req.body;
        const userId = req.account.user_id;
        const dislikedOrUndisliked = await CommentService_1.default.dislikeOrUndislikeAnswer(answerId, commentId, postId, userId);
        res.status(200).json({
            "message": dislikedOrUndisliked
        });
    }
}
exports.default = CommentController;
