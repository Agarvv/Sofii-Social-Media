"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = __importDefault(require("@models/chat/Chat"));
const Message_1 = __importDefault(require("@models/chat/Message"));
const User_1 = __importDefault(require("@models/users/User"));
const sequelize_1 = require("sequelize");
class ChatRepository {
    static async getUserChats(userId) {
        const chats = await Chat_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { sender_id: userId },
                    { receiver_id: userId }
                ]
            },
            include: [
                {
                    model: User_1.default,
                    as: 'Sender',
                    attributes: ['id', 'username', 'profilePicture', 'active']
                },
                {
                    model: User_1.default,
                    as: 'Receiver',
                    attributes: ['id', 'username', 'profilePicture', 'active']
                }
            ]
        });
        return chats;
    }
    static async getChat(chatId, userId) {
        return await Chat_1.default.findOne({
            where: {
                chat_id: chatId,
                [sequelize_1.Op.or]: {
                    sender_id: userId,
                    receiver_id: userId
                }
            },
            include: [
                {
                    model: User_1.default,
                    as: 'Sender',
                    attributes: ['id', 'username', 'profilePicture', 'active']
                },
                {
                    model: User_1.default,
                    as: 'Receiver',
                    attributes: ['id', 'username', 'profilePicture', 'active']
                },
                {
                    model: Message_1.default,
                    as: 'messages',
                    include: [
                        {
                            model: User_1.default,
                            as: 'message_user',
                            attributes: ['id', 'username', 'profilePicture', 'active']
                        }
                    ]
                }
            ]
        });
    }
    static async getUserChat(sender, receiver) {
        return await Chat_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        sender_id: receiver,
                        receiver_id: sender
                    },
                    {
                        sender_id: sender,
                        receiver_id: receiver
                    }
                ]
            },
            include: [
                {
                    model: Message_1.default,
                    as: 'messages',
                    include: [
                        {
                            model: User_1.default,
                            as: 'message_user',
                            attributes: ['id', 'username', 'profilePicture', 'active']
                        }
                    ]
                },
                {
                    model: User_1.default,
                    as: 'Sender',
                    attributes: ['id', 'username', 'profilePicture', 'active']
                },
                {
                    model: User_1.default,
                    as: 'Receiver',
                    attributes: ['id', 'username', 'profilePicture', 'active']
                }
            ]
        });
    }
    static async createMessage(chatId, senderId, message) {
        const createdMessage = await Message_1.default.create({
            message_room_id: chatId,
            message_user_id: senderId,
            message_content: message
        });
        // need to emit back to the client the message with his user relation
        const newMessage = await Message_1.default.findOne({
            where: {
                id: createdMessage.id
            },
            include: [
                {
                    model: User_1.default,
                    as: 'message_user'
                }
            ]
        });
        if (newMessage)
            return newMessage;
    }
}
exports.default = ChatRepository;
