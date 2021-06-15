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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pool_1 = __importDefault(require("../db/pool"));
const router = express_1.default.Router();
router.post('/', (request, response, _next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(request.body);
    const { username, password } = request.body;
    try {
        const { rows } = yield pool_1.default.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = rows[0];
        const passwordCorrect = yield bcrypt_1.default.compare(password, user['password']);
        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                err: 'invalid username or password'
            });
        }
        const userIdentity = {
            id: user['id'],
            username: user['username']
        };
        const token = jsonwebtoken_1.default.sign(userIdentity, process.env.SECRET, { expiresIn: 60 * 60 });
        return response.send({ token, username: user.username });
    }
    catch (err) {
        return response.status(401).json({ err });
    }
}));
exports.default = router;
//# sourceMappingURL=login.js.map