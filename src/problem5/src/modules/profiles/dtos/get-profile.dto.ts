import { IsOptional } from "class-validator";
import { PaginationDto } from "../../../common/types";
import { Transform } from "class-transformer";

export class GetProfileDto extends PaginationDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  isVerified?: boolean;
}
