"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.commentSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).required(),
    email: joi_1.default.string().email().required(),
    comment: joi_1.default.string().min(10).required(),
    status: joi_1.default.boolean().required(),
    BlogId: joi_1.default.string().required()
});
