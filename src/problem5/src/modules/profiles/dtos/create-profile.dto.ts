import { IsNotEmpty } from "class-validator";

export class CreateProfileDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  dob!: Date;
}
