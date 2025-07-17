import { IsOptional } from "class-validator";

export type Pagination<T> = {
  data: Array<T>;
  total: number;
  limit: number;
  currentPage: number;
  lastPage: number;
};

export class PaginationDto {
  @IsOptional()
  limit = 10;

  @IsOptional()
  page = 1;
}
