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
exports.login = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport_1.default.authenticate('login', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (err || !user) {
                    const error = new Error('An error occurred.');
                    return reject(error);
                }
                req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                    if (error)
                        return reject(error);
                    const body = { _id: user._id, email: user.email };
                    const token = jsonwebtoken_1.default.sign({ user: body }, 'TOP_SECRET');
                    resolve(token);
                }));
            }
            catch (error) {
                reject(error);
            }
        }))(req, res, next);
    });
};
exports.login = login;
// const router = express.Router();
// router.post('/login', async (req, res, next) => {
//   try {
//     const token = await login(req, res, next);
//     res.json({ token });
//   } catch (error) {
//     next(error);
//   }
// });
