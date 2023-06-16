import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../util/http-response.adapter";

export const userCheck = (req: Request, res: Response, next: NextFunction) => {
  const { user, password, confirmPassword } = req.body;

  if (!user) {
    return ApiResponse.notProvided(res, "Usuario");
  }

  if (!password) {
    return ApiResponse.notProvided(res, "Senha");
  }

  if (!confirmPassword) {
    return ApiResponse.notProvided(res, "Confirmação de senha");
  }
  next();
};
