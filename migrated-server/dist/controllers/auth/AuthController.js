"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("@services/auth/AuthService"));
class AuthController {
    static async registerUser(req, res) {
        const { username, email, password } = req.body;
        await AuthService_1.default.registerUser(username, email, password);
        res.status(201).json({ message: "¡Welcome To Sofii!" });
    }
    static async loginUser(req, res) {
        const { email, password } = req.body;
        const { userId, accessToken } = await AuthService_1.default.loginUser(email, password);
        res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 3600000 });
        res.status(200).json({ accessToken: accessToken, userId: userId });
    }
    static async sendResetPassword(req, res) {
        const { email } = req.body;
        await AuthService_1.default.sendResetPassword(email);
        res.status(200).json({
            "message": "¡Check Your Email!"
        });
    }
    static async resetPassword(req, res) {
        const { email, password, resetToken } = req.body;
        await AuthService_1.default.resetPassword(email, password, resetToken);
        res.status(200).json({
            "message": "¡Your Password Is Set!"
        });
    }
    static async checkAuthentication(req, res) {
        const jwt = req.cookies.jwt;
        const userId = await AuthService_1.default.checkAuthentication(jwt);
        res.status(200).json({
            userId: userId
        });
    }
}
exports.default = AuthController;
