import { Profile } from "@prisma/client";
import { Pagination } from "../../../common/types";
import { GetProfileDto } from "../dtos/get-profile.dto";
import { CreateProfileDto } from "../dtos/create-profile.dto";
import { UpdateProfileDto } from "../dtos/update-profile.dto";

export interface IProfileService {
  list(query: GetProfileDto): Promise<Pagination<Profile>>;
  detail(id: number): Promise<Profile | null>;
  create(data: CreateProfileDto): Promise<Profile>;
  update(id: number, data: UpdateProfileDto): Promise<void>;
  delete(id: number): Promise<void>;
}
