"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.likeSchema = joi_1.default.object({
    like: joi_1.default.boolean().required(),
    blogId: joi_1.default.string().required(),
});
