"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("@models/users/User"));
const PasswordResetToken_1 = __importDefault(require("@models/users/PasswordResetToken"));
const UserRepository_1 = __importDefault(require("@repositories/user/UserRepository"));
const uuid_1 = require("uuid");
const CustomError_1 = __importDefault(require("@outils/CustomError"));
const JwtHelper_1 = __importDefault(require("@helpers/JwtHelper"));
const MailHelper_1 = __importDefault(require("@helpers/MailHelper"));
class AuthService {
    static async registerUser(username, email, password) {
        if (await UserRepository_1.default.existsByEmail(email)) {
            throw new CustomError_1.default("That email is already taken.", 409);
        }
        const hashedPassword = await this.hashPassword(password);
        await User_1.default.create({
            username,
            email,
            password: hashedPassword,
        });
    }
    static async loginUser(email, password) {
        const user = await UserRepository_1.default.findByEmail(email);
        if (!user) {
            throw new CustomError_1.default("That email doesn't exist.", 400);
        }
        await this.ensurePasswordMatch(password, user.password);
        const jwtPayload = this.generateJwtPayload(user);
        const jwt = JwtHelper_1.default.generateToken(jwtPayload);
        return { userId: user.id, accessToken: jwt };
    }
    static async sendResetPassword(email) {
        if (await UserRepository_1.default.existsByEmail(email)) {
            const resetToken = this.generateResetToken();
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 1);
            await PasswordResetToken_1.default.create({
                token: resetToken,
                expires_at: expiresAt,
                used: false,
                user_email: email,
            });
            await this.sendResetEmail(email, resetToken);
        }
    }
    static async resetPassword(email, newPassword, resetToken) {
        const user = await UserRepository_1.default.findByEmail(email);
        if (user) {
            const dbResetToken = await PasswordResetToken_1.default.findOne({
                where: {
                    user_email: email,
                    token: resetToken,
                },
            });
            if (dbResetToken && !this.isResetTokenExpired(dbResetToken)) {
                user.password = await this.hashPassword(newPassword);
                await user.save();
                await dbResetToken.destroy();
                return;
            }
            throw new CustomError_1.default("Your Reset Password Link Has Expired...", 400);
        }
    }
    static async checkAuthentication(jwt) {
        const userDecoded = await JwtHelper_1.default.verifyToken(jwt);
        if (userDecoded)
            return userDecoded.user_id;
        throw new CustomError_1.default("You Aren't Authenticated.", 401);
    }
    static async registerBySocialMedia(user) {
        const randomPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await this.hashPassword(randomPassword);
        const newUser = await User_1.default.create({
            username: user.username,
            email: user.email,
            password: hashedPassword
        });
        return newUser;
    }
    static async authenticateWithSocialMedia(user) {
        const dbUser = await UserRepository_1.default.findByEmail(user.email);
        if (dbUser) {
            const payload = this.generateJwtPayload(dbUser);
            const jwt = await JwtHelper_1.default.generateToken(payload);
            return { jwt: jwt, userId: dbUser.id };
        }
        const newUser = await this.registerBySocialMedia(user);
        const payload = this.generateJwtPayload(newUser);
        const jwt = await JwtHelper_1.default.generateToken(payload);
        return { jwt: jwt, userId: newUser.id };
    }
    static async hashPassword(rawPassword) {
        return await bcryptjs_1.default.hash(rawPassword, 10);
    }
    static async ensurePasswordMatch(original, hashed) {
        const isMatch = await bcryptjs_1.default.compare(original, hashed);
        if (!isMatch) {
            throw new CustomError_1.default("Wrong Password", 400);
        }
    }
    static generateJwtPayload(user) {
        return {
            user_id: user.id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            banner: user.banner,
            bio: user.bio,
            civilStatus: user.civil_status,
            gender: user.gender,
            nativeCity: user.native_city,
            ubication: user.ubication,
            job: user.job,
        };
    }
    static async sendResetEmail(email, resetToken) {
        const resetUrl = `https://sofii.vercel.app/reset-password/${email}/${resetToken}`;
        await MailHelper_1.default.sendMail(email, 'Reset Your Password At Sofii', `Enter this link to reset your password: ${resetUrl}`);
    }
    static generateResetToken() {
        const uuid = (0, uuid_1.v4)();
        let base64Token = Buffer.from(uuid).toString('base64');
        base64Token = base64Token.replace(/\//g, '_').replace(/\+/g, '-').replace(/\?/g, '');
        return base64Token;
    }
    static isResetTokenExpired(resetToken) {
        const now = new Date();
        return resetToken.expires_at <= now;
    }
}
exports.default = AuthService;
