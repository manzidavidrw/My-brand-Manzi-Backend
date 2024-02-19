"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.commentSchema = joi_1.default.object({
    content: joi_1.default.string().required(),
    sender: joi_1.default.string().required(),
    receiver: joi_1.default.boolean().required(),
    createdAt: joi_1.default.string().required()
});
