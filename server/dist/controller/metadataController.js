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
exports.metadataByUrls = void 0;
const metadata_scraper_1 = __importDefault(require("metadata-scraper"));
const metadataByUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const urlList = req.body.urlList;
    const response = {};
    const errors = [];
    try {
        // validation check
        if (!urlList || urlList.length === 0) {
            errors.push("Invalid URLs list");
            return res.status(400).send({
                err: errors,
            });
        }
        // fetch metadata
        for (const item of urlList) {
            try {
                const metadataResults = yield (0, metadata_scraper_1.default)(item);
                response[item] = metadataResults;
            }
            catch (error) {
                errors.push(`Invalid URL: ${item}`);
                return res.status(400).send({
                    err: errors,
                });
            }
        }
        res.status(200).json({ metadata: response });
    }
    catch (error) {
        return res.status(500).send({
            err: errors,
        });
    }
});
exports.metadataByUrls = metadataByUrls;
//# sourceMappingURL=metadataController.js.map