import { bdUser } from "../database/bdUser";
import { Errands } from "../models/errands.models";
import { User } from "../models/user.models";
import { ErradsReposity } from "../repositorys/errand.repository";
import { UserRepository } from "../repositorys/user.repository";
import { ApiResponse } from "../util/http-response.adapter";
import { Request, Response, response } from "express";

export class ErrandsControllers {
  public async create(req: Request, res: Response) {
    try {
      const { iduser } = req.params;
      const { title, description } = req.body;

      const user = await new UserRepository().getById(iduser);

      if (!user) {
        return ApiResponse.notFound(res, "Usuario não encontrado!");
      }

      const errand = new Errands(title, description, user);
      const result = await new ErradsReposity().create(errand);

      return ApiResponse.success(
        res,
        "Recado Criado com sucesso",
        result.toJsonE()
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const { iduser } = req.params;
      const user = await new UserRepository().getById(iduser);

      if (!user) {
        return ApiResponse.notFound(res, "Usuario não encontrado!");
      }

      const errand = await new ErradsReposity().list({ idUser: iduser });

      return ApiResponse.success(
        res,
        `Lista de recados do usuario ${user.email}`,
        errand.map((user) => user.toJsonE())
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
