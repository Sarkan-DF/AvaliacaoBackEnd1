import { Router } from "express";
import { UserControllers } from "../controllers/user.controller";
import { userCheck } from "../middlewares/user.middlewares";
import { errandsRoutes } from "./errands.routes";

export const userRoutes = () => {
  const app = Router();

  app.post("/", [userCheck], new UserControllers().create);
  app.get("/", new UserControllers().list);

  app.use("/:iduser/errands", errandsRoutes());

  return app;
};
