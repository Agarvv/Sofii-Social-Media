"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatService_1 = __importDefault(require("@services/chat/ChatService"));
class ChatController {
    static async chat(req, res) {
        const { receiverId } = req.body;
        const chatId = await ChatService_1.default.startOrGetChat(req.account.user_id, receiverId);
        res.status(200).json({
            chatId: chatId
        });
    }
    static async getChatById(req, res) {
        const { id } = req.params;
        const chat = await ChatService_1.default.getChat(Number(id), req.account.user_id);
        res.status(200).json({
            chat: chat
        });
    }
    static async getChats(req, res) {
        const chats = await ChatService_1.default.getUserChats(req.account.user_id);
        res.status(200).json({
            chats: chats
        });
    }
}
exports.default = ChatController;
