import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../util/http-response.adapter";

export const loginCheck = (req: Request, res: Response, next: NextFunction) => {
  const { user, password } = req.body;

  if (!user) {
    return ApiResponse.notProvided(res, "Usuario");
  }

  if (!password) {
    return ApiResponse.notProvided(res, "Senha");
  }

  next();
};
