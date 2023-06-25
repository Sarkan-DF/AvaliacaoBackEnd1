import express, { Request, Response } from "express";
// import { User } from "./models/user";
// import { usersDb } from "./database/users";
import * as dotenv from "dotenv";
import { userRoutes } from "./routes/user.routes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes());

app.listen(process.env.PORT, () => {
  console.log("API is running...");
});
