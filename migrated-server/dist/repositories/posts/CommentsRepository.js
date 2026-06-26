"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = __importDefault(require("@models/posts/comments/Comment"));
const CommentAwnser_1 = __importDefault(require("@models/posts/comments/CommentAwnser"));
const User_1 = __importDefault(require("@models/users/User"));
const CommentLikes_1 = __importDefault(require("@models/posts/comments/CommentLikes"));
const CommentDislikes_1 = __importDefault(require("@models/posts/comments/CommentDislikes"));
const CommentAwnsersLikes_1 = __importDefault(require("@models/posts/comments/CommentAwnsersLikes"));
const CommentAwnsersDislikes_1 = __importDefault(require("@models/posts/comments/CommentAwnsersDislikes"));
class CommentsRepository {
    static async findCommentById(id) {
        return await Comment_1.default.findOne({
            where: { id: id },
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
    }
    static async findAnswerById(id) {
        return await CommentAwnser_1.default.findOne({
            where: { id: id },
            include: [
                { model: User_1.default, as: 'awnser_user' },
                { model: CommentAwnsersLikes_1.default, as: 'awnser_likes' },
                { model: CommentAwnsersDislikes_1.default, as: 'awnser_dislikes' }
            ]
        });
    }
}
exports.default = CommentsRepository;
