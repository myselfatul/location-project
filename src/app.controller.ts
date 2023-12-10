import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  CalculateTripCostForm,
  CreateLocationForm,
  SearchLocationForm,
} from './location/location.entity';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('/locations')
  async createlocation(
    @Body() form: CreateLocationForm,
    @Res() res: Response,
  ): Promise<any> {
    const start = process.hrtime();
    const result = await this.service.createLocations({ form });
    const end = process.hrtime(start);
    const elapsedTime = end[0] * 1e9 + end[1];
    return res.json({
      result,
      time_ns: elapsedTime,
    });
  }

  @Get('/locations')
  async searchLocationByCategory(
    @Query('category') category: string,
    @Res() res: Response,
  ): Promise<any> {
    const start = process.hrtime();
    const result = await this.service.searchLocationByCategory({ category });
    const end = process.hrtime(start);
    const elapsedTime = end[0] * 1e9 + end[1];
    return res.json({
      ...result,
      time_ns: elapsedTime,
    });
  }

  @Post('/search')
  async searchlocation(
    @Body() form: SearchLocationForm,
    @Res() res: Response,
  ): Promise<any> {
    const start = process.hrtime();
    const result = await this.service.findNearbyLocations({ form });
    const end = process.hrtime(start);
    const elapsedTime = end[0] * 1e9 + end[1];
    return res.json({
      ...result,
      time_ns: elapsedTime,
    });
  }

  @Get('/trip-cost')
  async tripCost(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Body() form: CalculateTripCostForm,
    @Res() res: Response,
  ): Promise<any> {
    const start = process.hrtime();
    const result = await this.service.tripCost({
      form,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
    const end = process.hrtime(start);
    const elapsedTime = end[0] * 1e9 + end[1];
    return res.json({
      result,
      time_ns: elapsedTime,
    });
  }
}
