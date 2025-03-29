import { Router } from "express";
import { getCurrentUser, updateUser } from "../controllers/user";
import authMiddleware from "../middleware/auth";

const routes = Router();

routes.get("/", authMiddleware, getCurrentUser);
routes.patch("/", authMiddleware, updateUser);

export default routes;
