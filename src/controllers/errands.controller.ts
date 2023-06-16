import { bdUser } from "../database/bdUser";
import { Errands } from "../models/errands.models";
import { User } from "../models/user.models";
import { ApiResponse } from "../util/http-response.adapter";
import { Request, Response, response } from "express";

export class ErrandsControllers {
  public create(req: Request, res: Response) {
    try {
      const { iduser } = req.params;
      const { title, description } = req.body;

      const existeUsuario = bdUser.find((login) => login.idUser === iduser);
      if (!existeUsuario) {
        return ApiResponse.notFound(res, "Usuario");
      }

      const errand = new Errands(title, description);
      existeUsuario.errands.push(errand);

      return ApiResponse.success(
        res,
        "Recado Criado com sucesso",
        existeUsuario.errands[existeUsuario.errands.length - 1].toJsonE()
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public list(req: Request, res: Response) {
    try {
      const { iduser } = req.params;
      const { title, description } = req.query;

      const existeUsuario = bdUser.find((user) => user.idUser === iduser);
      if (!existeUsuario?.errands) {
        return ApiResponse.notFound(res, `Recado do usuario não encontrado!`);
      }

      return ApiResponse.success(
        res,
        `Lista de recados do usuario ${existeUsuario.user}`,
        existeUsuario.errands.map((user) => user.toJsonE())
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { iduser, iderrands } = req.params;
      const existeUsuario = bdUser.find((user) => user.idUser === iduser);
      if (!existeUsuario) {
        return ApiResponse.notFound(res, "Usuario");
      }

      const existeErrands = existeUsuario.errands.findIndex(
        (item) => item.idErrands === iderrands
      );

      if (existeErrands < 0) {
        return ApiResponse.notFound(res, "Recados");
      }

      const deleteErrands = existeUsuario.errands.splice(existeErrands, 1);
      return ApiResponse.success(
        res,
        "Recado deletado com sucesso",
        deleteErrands
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { iduser, iderrands } = req.params;
      const { title, description } = req.body;

      const existeUsuario = bdUser.find((user) => user.idUser === iduser);
      if (!existeUsuario) {
        return ApiResponse.notFound(res, "Usuario");
      }

      const existeErrands = existeUsuario.errands.find(
        (item) => item.idErrands === iderrands
      );
      if (!existeErrands) {
        return ApiResponse.notFound(res, "Recados");
      }

      if (title) {
        existeErrands.title = title;
      }

      if (description) {
        existeErrands.description = description;
      }

      return ApiResponse.success(
        res,
        "Recado alterado com sucesso",
        existeErrands.toJsonE()
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
