import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      roleId
    } = req.body;

    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId
    });

    return res.status(201).json({
      message: "User created successfully.",
      user
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error."
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.getDataValue("password")
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials."
      });
    }

    const token = jwt.sign(
      {
        id: user.getDataValue("id"),
        roleId: user.getDataValue("roleId")
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h"
      }
    );

    return res.status(200).json({
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error."
    });
  }
};