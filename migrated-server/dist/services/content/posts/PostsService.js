"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("@models/posts/Post"));
const PostsRepository_1 = __importDefault(require("@repositories/posts/PostsRepository"));
const LikesRepository_1 = __importDefault(require("@repositories/posts/LikesRepository"));
const SavedRepository_1 = __importDefault(require("@repositories/posts/SavedRepository"));
const Likes_1 = __importDefault(require("@models/posts/Likes"));
const SavedPost_1 = __importDefault(require("@models/posts/SavedPost"));
const CustomError_1 = __importDefault(require("@outils/CustomError"));
const NotificationsService_1 = __importDefault(require("@services/notifications/NotificationsService"));
const websocket_1 = __importDefault(require("@websocket/websocket"));
const User_1 = __importDefault(require("@models/users/User"));
const Comment_1 = __importDefault(require("@models/posts/comments/Comment"));
class PostsService {
    static async createPost(description, picture, userId) {
        const io = websocket_1.default.getIO();
        const newPost = await Post_1.default.create({
            description: description,
            postPicture: picture,
            user_id: userId,
        });
        const fullPost = await Post_1.default.findByPk(newPost.id, {
            include: [
                { model: User_1.default, as: 'user' },
                { model: Likes_1.default, as: 'postLikes' },
                { model: SavedPost_1.default, as: 'saved_post' },
                { model: Comment_1.default, as: 'postComments' }
            ]
        });
        io.emit('createdPost', fullPost);
    }
    static async getPostsAndUsersMayLike() {
        return await PostsRepository_1.default.getPostsAndUsersMayLike();
    }
    static async getPostDetails(postId) {
        const post = await PostsRepository_1.default.getPostDetails(postId);
        return post;
    }
    static async deletePostById(id) {
        const post = await PostsRepository_1.default.getPostById(id);
        await post.destroy();
    }
    static async likeOrDislike(postId, user) {
        const io = websocket_1.default.getIO();
        const postLike = await LikesRepository_1.default.getPostLike(postId, user.user_id);
        const post = await PostsRepository_1.default.getPostWithoutDetails(postId);
        if (!post) {
            throw new CustomError_1.default("Post not found", 404);
        }
        if (postLike) {
            await postLike.destroy();
            io.emit('unlikePost', postLike);
            return "Post Unliked!";
        }
        const newLike = await Likes_1.default.create({
            post_id: postId,
            user_id: user.user_id
        });
        io.emit('likePost', newLike);
        if (user.user_id !== post.user_id) {
            await NotificationsService_1.default.sendNotificationToUser(post.user_id, user.username, user.user_id, post, null, 'POST_LIKED');
        }
        return "Post Liked!";
    }
    static async saveOrUnsave(postId, userId) {
        const io = websocket_1.default.getIO();
        const saved = await SavedRepository_1.default.getSaved(postId, userId);
        if (saved) {
            await saved.destroy();
            io.emit('unsavedPost', saved);
            return "¡Post Unsaved!";
        }
        const newSaved = await SavedPost_1.default.create({
            user_id: userId,
            post_id: postId
        });
        io.emit('savedPost', newSaved);
        return "¡Post Saved!";
    }
    static async getSaveds(userId) {
        return await SavedRepository_1.default.getSaveds(userId);
    }
}
exports.default = PostsService;
