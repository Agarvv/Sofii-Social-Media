"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JwtHelper_1 = __importDefault(require("@helpers/JwtHelper"));
const authMiddleware = (req, res, next) => {
    const jwtToken = req.cookies?.jwt;
    if (!jwtToken) {
        return res.status(401).json({
            error: "Please log in.",
        });
    }
    try {
        const decoded = JwtHelper_1.default.verifyToken(jwtToken);
        req.account = decoded;
        return next();
    }
    catch (error) {
        return res.status(401).json({
            error: "Please log in.",
        });
    }
};
exports.default = authMiddleware;
