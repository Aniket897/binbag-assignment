import express, { Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDatabase from "./config/db";
import "dotenv/config";

// routes
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

const PORT = process.env.PORT || 8080;
const MongoUrl = process.env.MONGO_URL as string;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.get("/health", (_, resp: Response) => {
  resp.status(200).json({
    message: "👍 Server is up and running",
  });
});

// listning server
app.listen(PORT, () => {
  ConnectDatabase(MongoUrl);
  console.log(`server is running on port ${PORT}`);
});
