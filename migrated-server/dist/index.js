"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
require("@models/relations");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const websocket_1 = __importDefault(require("./websocket/websocket"));
const AuthMiddleware_1 = __importDefault(require("@middleware/AuthMiddleware"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
require("@config/GooglePassport");
require("@config/GithubPassport");
const cors_1 = __importDefault(require("cors"));
dotenv.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'https://sofii-vsly.vercel.app',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, express_session_1.default)({
    secret: 'unsecureSecret2025',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
const server = http_1.default.createServer(app);
websocket_1.default.init(server);
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    if (req.path.startsWith('/api/sofii/auth') || req.path.startsWith('/auth')) {
        return next();
    }
    (0, AuthMiddleware_1.default)(req, res, next);
});
app.use(routes_1.default);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});
app.get('/', (req, res) => {
    res.send('Sofii API Migration to TypeScript is OK!');
});
const port = process.env.PORT || 3000;
server.listen(port, async () => {
    console.log(`Sofii API started on port ${port}`);
    try {
        await database_1.default.sync({ force: false });
        console.log("Database Connected Successfully.");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
    }
});
