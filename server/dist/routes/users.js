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
const pool_1 = __importDefault(require("../db/pool"));
const router = express_1.default.Router();
router.get('/', (_request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield pool_1.default.query("SELECT * FROM users");
        response.json(rows);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/:id', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const { rows } = yield pool_1.default.query("SELECT * FROM users WHERE id = $1", [id]);
        response.json(rows[0]);
    }
    catch (err) {
        next(err);
    }
}));
router.post('/', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, email, password } = request.body;
        const { rows } = yield pool_1.default.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, password]);
        response.json(rows);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map