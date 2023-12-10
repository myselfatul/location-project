import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { CalculateTripCostForm } from 'src/location/location.entity';

@Injectable()
export class CoreThirdPartyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  async findTripCost({
    form,
    latitude,
    longitude,
  }: Readonly<{
    form: CalculateTripCostForm;
    latitude: number;
    longitude: number;
  }>): Promise<AxiosResponse<any>> {
    const payload = {
      from: {
        lat: form.latitude,
        lng: form.longitude,
      },
      to: {
        lat: latitude,
        lng: longitude,
      },
    };

    try {
      return await firstValueFrom(
        this.httpService.post(
          `${this.config.get<string>(
            'TOLL_API_BASE_URL',
          )}/toll/v2/origin-destination-waypoints`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': this.config.get<string>('TOLL_API_KEY'),
            },
          },
        ),
      );
    } catch (error) {
      console.log(error);
      throw error?.response?.data ?? error
    }
  }
}
