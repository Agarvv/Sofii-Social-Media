"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("@models/users/User"));
const sequelize_1 = require("sequelize");
class UserRepository {
    async findByEmail(email) {
        return User_1.default.findOne({
            where: {
                email: email
            }
        });
    }
    async existsByEmail(email) {
        const count = await User_1.default.count({
            where: { email: { [sequelize_1.Op.eq]: email } }
        });
        return count > 0;
    }
}
exports.default = new UserRepository();
