// import { v4 as createUuid2 } from "uuid";

import { randomUUID } from "crypto";

export class Errands {
  public idErrands: string;
  constructor(private _title: string, private _description: string) {
    this.idErrands = randomUUID();
  }

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get description(): string {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public toJsonE() {
    return {
      title: this._title,
      description: this._description,
      idErrands: this.idErrands,
    };
  }
}
