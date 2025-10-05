import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import { catchError, HandleERROR } from "vanta-api";
import authRoute from "./Routes/Auth.js";
import exportValidation from "./Middlewares/ExportValidation.js";
import isLogin from "./Middlewares/IsLogin.js";
import userRoute from "./Routes/User.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("Public"));
app.use("/api/auth", authRoute);
app.use(exportValidation);
app.use(isLogin);
app.use("/api/user", userRoute);

app.use((req, res, next) => {
  return next(new HandleERROR("Not Found", 404));
});
app.use(catchError);
export default app;
