"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, _request, response, _next) {
    console.log(err);
    response.status(500).send("Error: " + err);
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map