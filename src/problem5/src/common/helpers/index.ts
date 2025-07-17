import { Pagination } from "../types";

export function createPaginationObject<T>(
  data: Array<T>,
  total: number,
  limit: number,
  page: number
): Pagination<T> {
  return {
    data,
    total: Number(total),
    limit: Number(limit),
    currentPage: Number(page),
    lastPage: Number(Math.ceil(total / limit)),
  };
}
