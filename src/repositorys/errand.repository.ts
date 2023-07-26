import { Database } from "../database/config/database.conection";
import { ErrandEntity } from "../database/entities/errand.entity";
import { Errands } from "../models/errands.models";
import { UserRepository } from "./user.repository";

export class ErradsReposity {
  private connection = Database.connection.getRepository(ErrandEntity);

  public async create(errand: Errands) {
    const ErrandEntity = this.connection.create({
      idErrands: errand.idErrands,
      title: errand.title,
      description: errand.description,
    });

    const result = await this.connection.save(ErrandEntity);
    return ErradsReposity.mapRowToModel(result);
  }

  public async getByIdUser(idUser: string) {
    const result = await this.connection.findOneBy({ idUser });

    if (!result) {
      return undefined;
    }

    return ErradsReposity.mapRowToModel(result);
  }

  public static mapRowToModel(entity: ErrandEntity) {
    const user = UserRepository.mapRowToModel(entity.user);
    return Errands.create(entity, user);
  }
}
