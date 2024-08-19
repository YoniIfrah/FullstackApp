"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1000, //second
    max: 5,
    message: {
        err: "Too many requests, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.default = limiter;
//# sourceMappingURL=limiter.js.map