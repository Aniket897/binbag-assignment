import { Express } from "express";

declare module "Express" {
  export interface Request {
    userId?: string;
  }
}
