import { injectable, inject } from "inversify";
import { IProfileService } from "../interfaces/IProfileService";
import { IProfileRepository } from "../interfaces/IProfileRepository";
import { TYPES } from "../../../inversify/types";
import { GetProfileDto } from "../dtos/get-profile.dto";
import { createPaginationObject } from "../../../common/helpers";
import { Profile } from "@prisma/client";
import { CreateProfileDto } from "../dtos/create-profile.dto";
import { UpdateProfileDto } from "../dtos/update-profile.dto";

@injectable()
export class ProfileService implements IProfileService {
  constructor(
    @inject(TYPES.ProfileRepository) private profileRepo: IProfileRepository
  ) {}

  async list(query: GetProfileDto) {
    const { items, total } = await this.profileRepo.pagination(query);

    return createPaginationObject(items, total, query.limit, query.page);
  }

  async detail(id: number): Promise<Profile | null> {
    const profile = await this.profileRepo.findById(id);
    return profile;
  }

  async create(data: CreateProfileDto): Promise<Profile> {
    return this.profileRepo.create(data);
  }

  async update(id: number, data: UpdateProfileDto): Promise<void> {
    const existingProfile = await this.profileRepo.findById(id);
    if (!existingProfile) {
      throw new Error(`Profile with id ${id} not found`);
    }
    await this.profileRepo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const existingProfile = await this.profileRepo.findById(id);
    if (!existingProfile) {
      throw new Error(`Profile with id ${id} not found`);
    }
    await this.profileRepo.delete(id);
  }
}
