"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProfileService_1 = __importDefault(require("@services/profile/ProfileService"));
class ProfileController {
    static async getUserProfile(req, res) {
        let profileId = req.params.profileId;
        if (profileId == "s") {
            profileId = req.account.user_id;
        } // if the param value "profileId" is equal to "s" that means we have to get our autenthicated current user profile. 
        const profile = await ProfileService_1.default.getUserProfile(Number(profileId));
        res.status(200).json({
            profile: profile
        });
    }
    static async changeProfileData(req, res) {
        const { field, value } = req.body;
        await ProfileService_1.default.changeProfileData(field, value, req.account.user_id);
        res.status(200).json({
            message: `Your ${field} Has Been Updated.`
        });
    }
}
exports.default = ProfileController;
