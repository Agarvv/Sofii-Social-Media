"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JwtHelper_1 = __importDefault(require("@helpers/JwtHelper"));
const socket_io_1 = require("socket.io");
const cookie_1 = __importDefault(require("cookie"));
const ChatService_1 = __importDefault(require("@services/chat/ChatService"));
const ProfileService_1 = __importDefault(require("@services/profile/ProfileService"));
let io = null;
exports.default = {
    init: (server) => {
        io = new socket_io_1.Server(server, {
            cors: {
                origin: 'https://sofii-vsly.vercel.app',
                methods: ['GET', 'POST'],
                credentials: true,
            },
        });
        io.on('connection', async (socket) => {
            const cookies = socket.request.headers.cookie
                ? cookie_1.default.parse(socket.request.headers.cookie)
                : {};
            const jwtToken = cookies.jwt;
            if (!jwtToken)
                return;
            const userDecoded = await JwtHelper_1.default.verifyToken(jwtToken);
            socket.join(String(userDecoded.user_id));
            await ProfileService_1.default.setUserStatus('online', userDecoded.user_id);
            socket.on('chatMessage', async (data) => {
                const { message, chat_id } = data;
                socket.join(String(chat_id));
                const newMessage = await ChatService_1.default.sendMessage(message, chat_id, userDecoded);
                io?.to(String(chat_id)).emit('chatMessage', newMessage);
            });
            socket.on('typing', (chatId) => {
                socket.join(chatId);
                socket.to(chatId).emit('typing');
            });
            socket.on('stopTyping', (chatId) => {
                socket.join(chatId);
                socket.to(chatId).emit('stopTyping');
            });
            socket.on('readMessage', async (data) => {
                socket.join(String(data.chatId));
                const readedMessage = await ChatService_1.default.readMessage(data.messageId);
                socket.to(String(data.chatId)).emit('readMessage', readedMessage);
            });
            socket.on('disconnect', async () => {
                await ProfileService_1.default.setUserStatus('offline', userDecoded.user_id);
            });
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not Initialized');
        }
        return io;
    },
};
