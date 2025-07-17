import { injectable } from "inversify";
import { prisma } from "../../../common/prisma";
import { IProfileRepository } from "../interfaces/IProfileRepository";
import { createPaginationObject } from "../../../common/helpers";
import { GetProfileDto } from "../dtos/get-profile.dto";
import { Prisma, Profile } from "@prisma/client";
import { CreateProfileDto } from "../dtos/create-profile.dto";
import { UpdateProfileDto } from "../dtos/update-profile.dto";

@injectable()
export class ProfileRepository implements IProfileRepository {
  async pagination(query: GetProfileDto) {
    const { limit, page, name, isVerified } = query;

    const where: Prisma.ProfileFindManyArgs["where"] = {};

    if (name) {
      where.name = { contains: name };
    }

    if (isVerified !== null && isVerified !== undefined) {
      where.isVerified = Boolean(isVerified);
    }

    const items = await prisma.profile.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });

    const total = await prisma.profile.count({
      where,
    });

    return { items, total };
  }

  async findById(id: number): Promise<Profile | null> {
    return prisma.profile.findUnique({
      where: { id },
    });
  }

  async create(data: CreateProfileDto): Promise<Profile> {
    return prisma.profile.create({
      data,
    });
  }

  async update(id: number, data: UpdateProfileDto): Promise<void> {
    await prisma.profile.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.profile.delete({
      where: { id },
    });
  }
}
