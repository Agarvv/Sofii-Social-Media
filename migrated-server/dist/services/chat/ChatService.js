"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("@outils/CustomError"));
const ChatRepository_1 = __importDefault(require("@repositories/chat/ChatRepository"));
const Chat_1 = __importDefault(require("@models/chat/Chat"));
const Message_1 = __importDefault(require("@models/chat/Message"));
class ChatService {
    static async getUserChats(userId) {
        const chats = await ChatRepository_1.default.getUserChats(userId);
        const chatsWithUserInfo = await Promise.all(chats.map(async (chat) => {
            const chatData = chat.toJSON();
            chatData.userToDisplayInfo = await this.getUserToDisplayInfo(chat, userId);
            return chatData;
        }));
        return chatsWithUserInfo;
    }
    static async getChat(chatId, userId) {
        const chat = await ChatRepository_1.default.getChat(chatId, userId);
        const userToDisplayInfo = await this.getUserToDisplayInfo(chat, userId);
        return { chat, userToDisplayInfo };
    }
    static async startOrGetChat(senderId, receiverId) {
        const chat = await ChatRepository_1.default.getUserChat(senderId, receiverId);
        if (chat) {
            return chat.chat_id;
        }
        const newChat = await Chat_1.default.create({
            sender_id: senderId,
            receiver_id: receiverId,
        });
        return newChat.chat_id;
    }
    static async sendMessage(message, chatId, sender) {
        const chat = await ChatRepository_1.default.getChat(chatId, sender.user_id);
        if (!chat) {
            throw new CustomError_1.default("Chat Not Found.", 404);
        }
        const newMessage = await ChatRepository_1.default.createMessage(chatId, sender.user_id, message);
        chat.last_message = message;
        await chat.save();
        console.log(`sender: ${chat.sender_id}, receiver: ${chat.receiver_id}`);
        /*const messageNotificationTarget = chat.sender_id === sender.user_id ? chat.receiver_id : chat.sender_id;
 
        console.log("notification target",messageNotificationTarget )
        await NotificationsService.sendNotificationToUser(
           messageNotificationTarget,
           sender.username,
           sender.user_id,
           chat,
           message,
           'CHAT_MESSAGE'
        ); */
        return newMessage;
    }
    static async readMessage(messageId) {
        const message = await Message_1.default.findByPk(messageId);
        if (message) {
            message.readed = true;
            await message.save();
            return message;
        }
        throw new CustomError_1.default("Message not found", 404);
    }
    static async getUserToDisplayInfo(chat, userId) {
        return chat.Sender.id == userId ? chat.Receiver : chat.Sender;
    }
}
exports.default = ChatService;
