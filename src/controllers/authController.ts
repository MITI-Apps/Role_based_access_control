import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import User from "../models/User.js";
import Role from "../models/Role.js";
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

    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(400).json({
        message: "Invalid role."
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
      password: hashedPassword
    });

    const chck = await (user as any).addRole(role);
 

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
        user.dataValues.password
      ); 

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials."
      });
    }

    const roles = await (user as any).getRoles();

    const permissionArrays = await Promise.all(
      roles.map((r: any) => r.getPermissions())
    );
    
    const permissions = permissionArrays.flat();
    const permissionNames = permissions.map(
      (p: any) => p.getDataValue("name")
    );
    const token = jwt.sign(
      {
        id: user.getDataValue("id"),
        permissions: permissionNames
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