"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SearchService_1 = __importDefault(require("@services/search/SearchService"));
class SearchController {
    static async search(req, res) {
        const { query } = req.params;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        const queryStr = Array.isArray(query) ? query[0] : query;
        const results = await SearchService_1.default.search(queryStr);
        res.status(200).json({
            results: results
        });
    }
}
exports.default = SearchController;
