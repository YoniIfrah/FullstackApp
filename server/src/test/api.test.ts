import request from "supertest";
import express from "express";
import { metadataByUrls } from "../controller/metadataController";
import getMetaData from "metadata-scraper";

const app = express();
app.use(express.json());
app.post("/metadata", metadataByUrls);

jest.mock("metadata-scraper");

describe("metadataByUrls controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should return statusCode 200 for valid url", async () => {
        (getMetaData as jest.Mock).mockResolvedValue({
            url: "https://www.npmjs.com",
            title: "npm",
            provider: "npm",
            description: "The package manager for JavaScript",
            icon: "https://www.npmjs.com/favicon.ico",
        });
        const response = await request(app)
            .post("/metadata")
            .send({ urlList: ["https://www.npmjs.com"] })
            .expect(200);
    });

    test("should return statusCode 400 for empty array", async () => {
        const response = await request(app).post("/metadata").send({ urlList: [] }).expect(400);
    });

    test("should return statusCode 400 for invalid url", async () => {
        (getMetaData as jest.Mock).mockRejectedValueOnce(new Error("Invalid URL"));

        const response = await request(app)
            .post("/metadata")
            .send({ urlList: ["https://www.npm222js.com"] })
            .expect(400);
    });

    test("should return statusCode 400 for undefined urlList", async () => {
        const response = await request(app).post("/metadata").send({ urlList: undefined }).expect(400);

        expect(response.body).toEqual({
            err: ["Invalid URLs list"],
        });
    });
});
