"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metadataController_1 = require("../controller/metadataController");
const limiter_1 = __importDefault(require("../middleware/limiter"));
const router = (0, express_1.Router)();
router.post("/metadata", limiter_1.default, metadataController_1.metadataByUrls);
exports.default = router;
//# sourceMappingURL=metadataRouter.js.map