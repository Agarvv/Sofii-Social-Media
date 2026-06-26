"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikesRepository_1 = __importDefault(require("@repositories/posts/LikesRepository"));
const DislikesRepository_1 = __importDefault(require("@repositories/posts/DislikesRepository"));
const Comment_1 = __importDefault(require("@models/posts/comments/Comment"));
const CommentAwnser_1 = __importDefault(require("@models/posts/comments/CommentAwnser"));
const CommentLikes_1 = __importDefault(require("@models/posts/comments/CommentLikes"));
const CommentDislikes_1 = __importDefault(require("@models/posts/comments/CommentDislikes"));
const CommentAwnsersLikes_1 = __importDefault(require("@models/posts/comments/CommentAwnsersLikes"));
const CommentAwnsersDislikes_1 = __importDefault(require("@models/posts/comments/CommentAwnsersDislikes"));
const websocket_1 = __importDefault(require("@websocket/websocket"));
const User_1 = __importDefault(require("@models/users/User"));
class CommentService {
    static async comment(commentValue, postId, user) {
        const io = websocket_1.default.getIO();
        const newComment = await Comment_1.default.create({
            post_id: postId,
            user_id: user.user_id,
            comment_content: commentValue,
        });
        const fullComment = await Comment_1.default.findByPk(newComment.id, {
            include: [
                { model: User_1.default, as: 'commentUser' },
                { model: CommentLikes_1.default, as: 'comment_likes' },
                { model: CommentDislikes_1.default, as: 'comment_dislikes' },
                {
                    model: CommentAwnser_1.default,
                    as: 'awnsers',
                    include: [
                        { model: User_1.default, as: 'awnser_user' },
                        { model: CommentAwnsersLikes_1.default, as: 'awnser_likes' },
                        { model: CommentAwnsersDislikes_1.default, as: 'awnser_dislikes' }
                    ]
                }
            ]
        });
        io.emit('newComment', fullComment);
    }
    static async likeOrUnlikeComment(commentId, postId, user) {
        const io = websocket_1.default.getIO();
        const commentLike = await LikesRepository_1.default.getCommentLike(user.user_id, postId, commentId);
        if (commentLike) {
            await commentLike.destroy();
            io.emit('unlikeComment', commentLike);
            return "¡Comment Unliked!";
        }
        const newLike = await CommentLikes_1.default.create({
            user_id: user.user_id,
            post_id: postId,
            comment_id: commentId
        });
        io.emit('likeComment', newLike);
        return "Comment Liked!";
    }
    static async dislikeOrUndislikeComment(commentId, postId, userId) {
        const io = websocket_1.default.getIO();
        const commentDislike = await DislikesRepository_1.default.getCommentDislike(userId, postId, commentId);
        if (commentDislike) {
            await commentDislike.destroy();
            io.emit('undislikeComment', commentDislike);
            return "¡Comment Undisliked!";
        }
        const newDislike = await CommentDislikes_1.default.create({
            user_id: userId,
            comment_id: commentId,
            post_id: postId
        });
        io.emit('dislikeComment', newDislike);
        return "¡Comment Disliked!";
    }
    static async answerComment(commentId, postId, user, answerValue) {
        const io = websocket_1.default.getIO();
        const newAnswer = await CommentAwnser_1.default.create({
            post_id: postId,
            comment_id: commentId,
            user_id: user.user_id,
            answer_content: answerValue
        });
        const fullAnswer = await CommentAwnser_1.default.findByPk(newAnswer.id, {
            include: [
                { model: User_1.default, as: 'awnser_user' },
                { model: CommentAwnsersLikes_1.default, as: 'awnser_likes' },
                { model: CommentAwnsersDislikes_1.default, as: 'awnser_dislikes' }
            ]
        });
        io.emit('newCommentAnswer', fullAnswer);
    }
    static async likeOrUnlikeAnswer(answerId, commentId, postId, userId) {
        const io = websocket_1.default.getIO();
        const answerLike = await LikesRepository_1.default.getAnswerLike(userId, postId, commentId, answerId);
        if (answerLike) {
            await answerLike.destroy();
            io.emit('unlikeCommentAwnser', answerLike);
            return "¡Answer Unliked!";
        }
        const newLike = await CommentAwnsersLikes_1.default.create({
            user_id: userId,
            post_id: postId,
            comment_id: commentId,
            awnser_id: answerId
        });
        io.emit('likeCommentAwnser', newLike);
        return "¡Answer Liked!";
    }
    static async dislikeOrUndislikeAnswer(answerId, commentId, postId, userId) {
        const io = websocket_1.default.getIO();
        const answerDislike = await DislikesRepository_1.default.getAnswerDislike(userId, postId, commentId, answerId);
        if (answerDislike) {
            await answerDislike.destroy();
            io.emit('undislikeCommentAwnser', answerDislike);
            return "¡Answer Undisliked!";
        }
        const newDislike = await CommentAwnsersDislikes_1.default.create({
            user_id: userId,
            comment_id: commentId,
            awnser_id: answerId,
            post_id: postId
        });
        io.emit('dislikeCommentAwnser', newDislike);
        return "¡Answer Disliked!";
    }
}
exports.default = CommentService;
