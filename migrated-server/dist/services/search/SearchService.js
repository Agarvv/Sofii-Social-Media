"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SearchRepository_1 = __importDefault(require("@repositories/search/SearchRepository"));
class SearchService {
    static async search(query) {
        const results = await SearchRepository_1.default.search(query);
        return results;
    }
}
exports.default = SearchService;
