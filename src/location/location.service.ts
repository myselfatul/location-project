import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Location, Prisma } from '@prisma/client';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async createLocation({
    data,
  }: Readonly<{
    data: Prisma.LocationCreateInput;
  }>): Promise<Location> {
    return this.prisma.location.create({
      data,
    });
  }

  async searchLocation({
    where,
  }: Readonly<{
    where: Prisma.LocationWhereInput;
  }>): Promise<Location[]> {
    return this.prisma.location.findMany({
      where,
    });
  }
}
