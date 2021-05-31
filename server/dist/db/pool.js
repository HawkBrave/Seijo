"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool();
const intface = {
    query: (text, params) => pool.query(text, params),
};
exports.default = intface;
//# sourceMappingURL=pool.js.map