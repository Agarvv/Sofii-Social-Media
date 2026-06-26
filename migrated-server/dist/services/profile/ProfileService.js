"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProfileRepository_1 = __importDefault(require("@repositories/profile/ProfileRepository"));
const User_1 = __importDefault(require("@models/users/User"));
class ProfileService {
    static async getUserProfile(userId) {
        const profile = await ProfileRepository_1.default.getUserProfile(userId);
        return profile;
    }
    static async changeProfileData(field, value, userId) {
        const user = await User_1.default.findByPk(userId);
        if (user) {
            user[field] = value;
            await user.save();
        }
    }
    static async setUserStatus(status, userId) {
        const user = await User_1.default.findByPk(userId);
        if (user) {
            user.active = status == 'online';
            await user.save();
        }
    }
}
exports.default = ProfileService;
