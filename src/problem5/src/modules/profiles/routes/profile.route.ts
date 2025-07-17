import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";
import { validateDto } from "../../../common/middlewares/validator.middleware";
import { CreateProfileDto } from "../dtos/create-profile.dto";
import { UpdateProfileDto } from "../dtos/update-profile.dto";

const controller = new ProfileController();
export const profileRoutes = Router();

profileRoutes.get("/", controller.getAll.bind(controller));
profileRoutes.get("/:id", controller.detail.bind(controller));
profileRoutes.post(
  "/",
  validateDto(CreateProfileDto),
  controller.create.bind(controller)
);
profileRoutes.put(
  "/:id",
  validateDto(UpdateProfileDto),
  controller.update.bind(controller)
);
profileRoutes.delete("/:id", controller.delete.bind(controller));
