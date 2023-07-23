import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: true,
  synchronize: false,
  schema: "banco_dados",
  entities: ["src/database/entities/**/*.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
});

export default dataSource;
