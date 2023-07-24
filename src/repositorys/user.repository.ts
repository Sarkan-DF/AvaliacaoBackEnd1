import { Entity } from "typeorm";
import { Database } from "../database/config/database.conection";
import { UserEntity } from "../database/entities/user.entity";
import { User } from "../models/user.models";

export class UserRepository {
  private connection = Database.connection.getRepository(UserEntity);

  public async create(user: User) {
    const UserEntity = this.connection.create({
      idUser: user.idUser,
      email: user.email,
      password: user.password,
    });

    const result = await this.connection.save(UserEntity);
    return UserRepository.mapRowToModel(result);
  }

  public async list() {
    const result = await this.connection.find();

    return result.map((entity) => UserRepository.mapRowToModel(entity));
  }

  public async getByEmail(email: string) {
    const result = await this.connection.findOne({ where: { email } });

    if (!result) {
      return undefined;
    }

    return UserRepository.mapRowToModel(result);
  }

  public async getByPassword(password: string) {
    const result = await this.connection.findOne({ where: { password } });

    if (!result) {
      return undefined;
    }

    return UserRepository.mapRowToModel(result);
  }

  public static mapRowToModel(entity: UserEntity): User {
    return User.create(entity);
  }
}
