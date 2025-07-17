import { IsOptional } from "class-validator";

export class UpdateProfileDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  dob?: Date;

  @IsOptional()
  isVerified?: boolean;
}
