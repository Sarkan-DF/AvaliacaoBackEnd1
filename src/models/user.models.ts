// import { v4 as createUuid2 } from "uuid";
import { randomUUID } from "crypto";
import { Errands } from "./errands.models";

export class User {
  public idUser: string;
  private _errands: Errands[];
  constructor(
    private _user: string,
    private _password: string,
    private _confirmPassword: string
  ) {
    this.idUser = randomUUID();
    this._errands = [];
  }

  public get user(): string {
    return this._user;
  }

  public get password(): string {
    return this._password;
  }

  public get confirmPassword(): string {
    return this._confirmPassword;
  }

  public get errands(): Errands[] {
    return this._errands;
  }

  public toJson() {
    return {
      user: this._user,
      password: this._password,
      confirmPassword: this._confirmPassword,
      idUser: this.idUser,
    };
  }
}
