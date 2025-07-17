import { Container } from "inversify";
import { TYPES } from "./types";
import { IProfileService } from "../modules/profiles/interfaces/IProfileService";
import { ProfileService } from "../modules/profiles/services/profile.service";
import { IProfileRepository } from "../modules/profiles/interfaces/IProfileRepository";
import { ProfileRepository } from "../modules/profiles/repositories/profile.repository";

const container = new Container();
container.bind<IProfileService>(TYPES.ProfileService).to(ProfileService);
container
  .bind<IProfileRepository>(TYPES.ProfileRepository)
  .to(ProfileRepository);

export { container };
