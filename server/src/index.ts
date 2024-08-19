import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import metadataRoutes from "./routes/metadataRouter";
import limiter from "./middleware/limiter";
import helmet from "helmet";

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use("/", metadataRoutes);

app.listen(port, () => {
    console.log("\x1b[38;5;214m%s\x1b[0m", `Server is running on http://localhost:${port}`);
});
