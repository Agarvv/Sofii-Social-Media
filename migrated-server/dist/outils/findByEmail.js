"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/users/User"));
const findByEmail = async (email) => {
    const user = await User_1.default.findOne({ where: { email } });
    if (!user) {
        throw new Error("user not found");
    }
    return user;
};
exports.default = findByEmail;
