import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

declare module "Express" {
  export interface Request {
    userId?: string;
  }
}

export default function authMiddleware(
  req: Request,
  resp: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies["auth-token"];

    if (!token) {
      resp.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const payload = verify(token, process.env.JWT_SECRET as string);
    req.userId = (payload as JwtPayload).id;
    next();
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
}
