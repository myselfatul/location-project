import { Injectable } from '@nestjs/common';
import {
  CalculateTripCostForm,
  CreateLocationForm,
  SearchLocationForm,
} from './location/location.entity';
import { LocationService } from './location/location.service';
import { calculateDistance } from './utils/util';
import { CoreThirdPartyService } from './core/third-party-toll-api.service';

@Injectable()
export class AppService {
  constructor(
    private readonly locationService: LocationService,
    private readonly coreThirdPartyservice: CoreThirdPartyService,
  ) {}

  async createLocations({
    form,
  }: Readonly<{
    form: CreateLocationForm;
  }>): Promise<any> {
    try {
      const result = await this.locationService.createLocation({
        data: form,
      });
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async searchLocationByCategory({
    category,
  }: Readonly<{
    category: string;
  }>): Promise<any> {
    try {
      const result = await this.locationService.searchLocation({
        where: { category },
      });
      return {
        locations: result,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findNearbyLocations({
    form,
  }: Readonly<{ form: SearchLocationForm }>): Promise<any> {
    const { latitude, longitude, category, radius_km } = form;
    try {
      // Filter locations based on category
      const filteredLocations = await this.locationService.searchLocation({
        where: { category },
      });

      // Filter locations within the specified radius
      const nearbyLocations = filteredLocations.filter((location) => {
        const distance = calculateDistance({
          lat1: latitude,
          lon1: longitude,
          lat2: location.latitude,
          lon2: location.longitude,
        });
        return distance <= radius_km;
      });

      return { locations: nearbyLocations };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async tripCost({
    form,
    latitude,
    longitude,
  }: Readonly<{
    form: CalculateTripCostForm;
    latitude: number;
    longitude: number;
  }>): Promise<any> {
    try {
      const result = await this.coreThirdPartyservice.findTripCost({
        form,
        latitude,
        longitude,
      });

      return {
        total_cost:
          result.data.routes.at(0).costs.fuel +
            result.data.routes.at(0).costs.tag ?? 0,
        fuel_cost: result.data.routes.at(0).costs.fuel ?? 0,
        toll_cost: result.data.routes.at(0).costs.tag ?? 0,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
