"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const metadataRouter_1 = __importDefault(require("./routes/metadataRouter"));
const limiter_1 = __importDefault(require("./middleware/limiter"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
const port = 3001;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(limiter_1.default);
app.use("/", metadataRouter_1.default);
app.listen(port, () => {
    console.log("\x1b[38;5;214m%s\x1b[0m", `Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map