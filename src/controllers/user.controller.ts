import { bdUser } from "../database/bdUser";
import { User } from "../models/user.models";
import { ApiResponse } from "../util/http-response.adapter";
import { Request, Response, response } from "express";

export class UserControllers {
  public create(req: Request, res: Response) {
    try {
      const { email, password, confirmPassword } = req.body;
      const users = new User(email, password, confirmPassword);
      if (password != confirmPassword) {
        return ApiResponse.badRequest(
          res,
          "Senha e confirmação de senha devem ser iguais!"
        );
      }
      bdUser.push(users);

      return ApiResponse.success(res, "Login criado com sucesso!", users);
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public list(req: Request, res: Response) {
    try {
      const { email, password, confirmPassword } = req.query;
      let result = bdUser;

      if (email) {
        result = bdUser.filter((login) => login.email === email);
      }

      if (password) {
        result = bdUser.filter((login) => login.password === password);
      }

      if (confirmPassword) {
        result = bdUser.filter((login) => login.confirmPassword === password);
      }

      return ApiResponse.success(
        res,
        "Lista de usuarios",
        result.map((users) => users.toJson())
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const login = bdUser.find((item) => item.email === email);
      if (!login) {
        return ApiResponse.invalidCredentials(res);
      }
      if (login.password !== password) {
        return ApiResponse.invalidCredentials(res);
      }

      return ApiResponse.success(res, "Logim efetuado com sucesso!", {
        idUser: login.idUser,
        email: login.email,
      });
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
