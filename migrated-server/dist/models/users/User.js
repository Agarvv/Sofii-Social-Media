"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class User extends sequelize_1.Model {
}
User.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 25],
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 100],
        },
    },
    profilePicture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh2-2t3Bmos3JVvS5V1NtxI-RlRjVIHLcp-sf55WCcEA&s=10"
    },
    bio: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM('male', 'female', 'non-binary', 'other'),
        allowNull: true,
    },
    last_login: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true,
        },
    },
    private: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    only_friends: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    birth_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true,
        },
    },
    ubication: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    native_city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    civil_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    banned: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    tag: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    job: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    banner: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://img.magnific.com/free-vector/banner-with-gingham-tablecloth-top-view-design_107791-12974.jpg?semt=ais_hybrid&w=740&q=80"
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'User',
    tableName: 'users',
});
exports.default = User;
