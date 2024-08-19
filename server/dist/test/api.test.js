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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const metadataController_1 = require("../controller/metadataController");
const metadata_scraper_1 = __importDefault(require("metadata-scraper"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/metadata", metadataController_1.metadataByUrls);
jest.mock("metadata-scraper");
describe("metadataByUrls controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("should return statusCode 200 for valid url", () => __awaiter(void 0, void 0, void 0, function* () {
        metadata_scraper_1.default.mockResolvedValue({
            url: "https://www.npmjs.com",
            title: "npm",
            provider: "npm",
            description: "The package manager for JavaScript",
            icon: "https://www.npmjs.com/favicon.ico",
        });
        const response = yield (0, supertest_1.default)(app)
            .post("/metadata")
            .send({ urlList: ["https://www.npmjs.com"] })
            .expect(200);
    }));
    test("should return statusCode 400 for empty array", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/metadata").send({ urlList: [] }).expect(400);
    }));
    test("should return statusCode 400 for invalid url", () => __awaiter(void 0, void 0, void 0, function* () {
        metadata_scraper_1.default.mockRejectedValueOnce(new Error("Invalid URL"));
        const response = yield (0, supertest_1.default)(app)
            .post("/metadata")
            .send({ urlList: ["https://www.npm222js.com"] })
            .expect(400);
    }));
    test("should return statusCode 400 for undefined urlList", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/metadata").send({ urlList: undefined }).expect(400);
        expect(response.body).toEqual({
            err: ["Invalid URLs list"],
        });
    }));
});
//# sourceMappingURL=api.test.js.map