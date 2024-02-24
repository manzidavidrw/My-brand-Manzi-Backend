"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
// import dotenv from "dotenv";
// // import _ from "lodash";
// import { Response, Request, NextFunction } from "express";
// import User, { userInterface } from "../models/User";
const passport_1 = __importDefault(require("../config/passport"));
const isAuthenticated = (req, res, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.isAuthenticated = isAuthenticated;
