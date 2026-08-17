import type { NextFunction, Request, Response } from "express";

export const authorize = (
  allowedPermissions: string[]
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.auth;
    if (!user){
      return res.status(403).json({
        message: "Access denied."
      });
    }
    const userPermissions: string[] = user.permissions || [];

    const hasPermission = userPermissions.some((permissionName: string) =>
      allowedPermissions.includes(permissionName)
    );

    if (!hasPermission) {
      return res.status(403).json({
        message: "Access denied."
      });
    }
    next();
  };
};