"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLike = void 0;
const Like_1 = __importDefault(require("../models/Like"));
const likeValidators_1 = require("../validators/likeValidators");
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, blogId } = req.body;
        const { error } = likeValidators_1.likeSchema.validate({ userId, blogId });
        if (error) {
            throw new Error(error.details[0].message);
        }
        const like = new Like_1.default({ userId, blogId });
        yield like.save();
        res.status(201).json({ message: 'Like created successfully' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createLike = createLike;
