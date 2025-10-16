import express from "express";
import upload from "../Utils/Upload";

const uploadRouter = express.Router();
uploadRouter.route("/").post(upload.single("file"), uploadSingle);
// uploadRouter.route(' /multi').post(upload.array('files',10),uploadMultiple)
uploadRouter.route("/remove/:id").delete(removeData);

export default uploadRouter;
