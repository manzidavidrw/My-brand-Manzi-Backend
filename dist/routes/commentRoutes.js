"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/commentRoutes.ts
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const router = express_1.default.Router();
router.post('/:id/comments', commentController_1.CreateComment);
router.get('/:id/comments', commentController_1.getCommentsByBlogId);
router.put('/:id/comments', commentController_1.updateComment);
router.delete('/:id/comments', commentController_1.deleteComment);
exports.default = router;
