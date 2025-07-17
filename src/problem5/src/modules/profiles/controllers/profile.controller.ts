import { NextFunction, Request, Response } from "express";
import { container } from "../../../inversify/container";
import { TYPES } from "../../../inversify/types";
import { IProfileService } from "../interfaces/IProfileService";
import { CreateProfileDto } from "../dtos/create-profile.dto";
import { prisma } from "../../../common/prisma";
import { NotFoundException } from "../../../common/errors/not-found.exception";
import { GetProfileDto } from "../dtos/get-profile.dto";
import { validateObject } from "../../../common/middlewares/validator.middleware";
import { UpdateProfileDto } from "../dtos/update-profile.dto";

export class ProfileController {
  private profileService = container.get<IProfileService>(TYPES.ProfileService);

  async getAll(req: Request, res: Response) {
    const [query, errors] = await validateObject(GetProfileDto, req.query);
    if (errors.length) {
      return res.status(400).json({
        message: "Validation Failed",
        errors,
      });
    }
    const data = await this.profileService.list(query);
    return res.json({ data });
  }

  async detail(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const profile = await this.profileService.detail(Number(id));

    if (!profile) {
      return next(new NotFoundException("Profile not found"));
    }

    return res.json({
      data: profile,
    });
  }

  async create(req: Request, res: Response) {
    const body: CreateProfileDto = req.body;
    const profile = await this.profileService.create(body);

    return res.json({
      data: profile,
    });
  }

  async update(req: Request, res: Response) {
    const body: UpdateProfileDto = req.body;
    const { id } = req.params;
    await this.profileService.update(Number(id), body);

    return res.json({
      success: true,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.profileService.delete(Number(id));

    return res.json({
      success: true,
    });
  }
}
