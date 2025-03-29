import { NextFunction, Request, Response } from "express";
import userModal from "../models/user";
import { FormatUser } from "../helpers/formatUser";

export const updateUser = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { name, address, bio, profile_picture } = req.body;

    const userId = req.userId;
    const user = await userModal
      .findByIdAndUpdate(
        userId,
        {
          name,
          address,
          bio,
          profile_picture,
        },
        {
          new: true,
        }
      )
      .select("-password");

    resp.status(200).json({
      message: "User updated successfully",
      user: FormatUser(user),
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getCurrentUser = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const user = await userModal.findById(userId).select("-password");

    resp.status(200).json({
      message: "User fetched successfully",
      user: FormatUser(user),
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};
