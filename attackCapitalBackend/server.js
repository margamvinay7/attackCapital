import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const port = process.env.PORT || 4000;

connectDB();

app.use("/auth", authRouter);
app.use("/post", postRouter);

app.listen(port, () => {
  console.log(process.env.PORT);
  console.log("server running on port", port);
});
