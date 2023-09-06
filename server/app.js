import "dotenv/config";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import fileUpload from "express-fileupload";
import router from "./router/index.routes.js";
import { PORT, ENV } from "./config/index.js";
import { errorHandler } from "./errors/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

ENV === 'production' &&
    app.use(express.static(path.resolve(__dirname, "../client/build")))

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`listening the server on http://localhost:${PORT}`);
});