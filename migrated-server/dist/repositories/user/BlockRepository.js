"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blocked_1 = __importDefault(require("@models/users/Blocked"));
class BlockRepository {
    static async block(blockerId, blockedId) {
        await Blocked_1.default.create({
            blocker_id: blockerId,
            blocked_id: blockedId
        });
    }
    static async getBlocked(blockedId, blockerId) {
        return Blocked_1.default.findOne({
            where: {
                blocked_id: blockedId,
                blocker_id: blockerId
            }
        });
    }
}
exports.default = BlockRepository;
