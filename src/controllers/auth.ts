import { NextFunction, Request, Response } from "express";
import userModal from "../models/user";
import { compareSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

export const register = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { name, email, address, password, bio, profile_picture } = req.body;

    if (!email) {
      resp.status(401).json({
        message: "email is required",
      });
      return;
    }

    if (!name) {
      resp.status(401).json({
        message: "name is required",
      });
      return;
    }

    if (!address) {
      resp.status(401).json({
        message: "address is required",
      });
      return;
    }

    if (!password) {
      resp.status(401).json({
        message: "password is required",
      });
      return;
    }

    // checking if email alredy exist in database
    const isUserExist = await userModal.findOne({
      email,
    });

    if (isUserExist) {
      resp.status(400).json({
        message: "Email is already exists",
      });
      return;
    }

    await userModal.create({
      email,
      name,
      password: hashSync(password, 10),
      address,
      bio,
      profile_picture,
    });

    resp.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      resp.status(401).json({
        message: "email is required",
      });
      return;
    }

    if (!password) {
      resp.status(401).json({
        message: "password is required",
      });
      return;
    }

    // checking if email alredy exist in database
    const user = await userModal.findOne({
      email,
    });

    if (!user) {
      resp.status(400).json({
        message: "Wrong Credentials",
      });
      return;
    }

    const isPasswordMatch = compareSync(password, user.password);

    if (!isPasswordMatch) {
      resp.status(400).json({
        message: "Wrong Credentials",
      });
      return;
    }

    // generating jwt token
    const token = sign({ id: user._id }, process.env.JWT_SECRET as string);

    // setting cookie
    resp.cookie("auth-token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    resp.status(200).json({
      message: "Login successfull",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        bio: user.bio,
        profile_picture: user.profile_picture,
        address: user.address,
      },
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};
