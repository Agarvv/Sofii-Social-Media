"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Notifications_1 = __importDefault(require("@models/notifications/Notifications"));
const User_1 = __importDefault(require("@models/users/User"));
class NotificationsRepository {
    static async getUserNotifications(userId) {
        return await Notifications_1.default.findAll({
            where: { user_target: userId },
            include: [
                {
                    model: User_1.default,
                    as: 'targetUser'
                },
                {
                    model: User_1.default,
                    as: 'sender'
                }
            ]
        });
    }
    static async deleteNotification(nId, userId) {
        const notification = await Notifications_1.default.destroy({
            where: {
                id: nId,
                user_target: userId
            }
        });
    }
}
exports.default = NotificationsRepository;
