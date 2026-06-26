"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostsService_1 = __importDefault(require("@services/content/posts/PostsService"));
class PostsController {
    static async createPost(req, res) {
        const { description, picture } = req.body;
        const userId = req.account.user_id;
        await PostsService_1.default.createPost(description, picture, userId);
        res.status(201).json({
            message: "Post Created!"
        });
    }
    static async getPostsAndUsers(req, res) {
        const posts = await PostsService_1.default.getPostsAndUsersMayLike();
        res.status(200).json({
            "data": posts
        });
    }
    static async GetPostById(req, res) {
        const post = await PostsService_1.default.getPostDetails(Number(req.params.id));
        res.status(200).json({
            "post": post
        });
    }
    static async likeOrUnlike(req, res) {
        const { postId } = req.body;
        const likedOrUnliked = await PostsService_1.default.likeOrDislike(postId, req.account);
        res.status(200).json({
            message: likedOrUnliked
        });
    }
    static async saveOrUnsave(req, res) {
        const { postId } = req.body;
        const savedOrUnsaved = await PostsService_1.default.saveOrUnsave(postId, req.account.user_id);
        res.status(200).json({
            message: savedOrUnsaved
        });
    }
    static async getSaveds(req, res) {
        const saveds = await PostsService_1.default.getSaveds(req.account.user_id);
        res.status(200).json({
            saveds: saveds
        });
    }
}
exports.default = PostsController;
