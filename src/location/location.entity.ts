import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLocationForm {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  readonly address!: string;

  @IsLatitude()
  @IsNotEmpty()
  readonly latitude!: number;

  @IsLongitude()
  @IsNotEmpty()
  readonly longitude!: number;
  
  @IsString()
  @IsNotEmpty()
  readonly category!: string;
}


export class SearchLocationForm {
    @IsLatitude()
    @IsNotEmpty()
    readonly latitude!: number;
  
    @IsLongitude()
    @IsNotEmpty()
    readonly longitude!: number;
    
    @IsString()
    @IsNotEmpty()
    readonly category!: string;

    @IsNumber()
    @IsNotEmpty()
    readonly radius_km!: number;
  }

  export class CalculateTripCostForm {
    @IsLatitude()
    @IsNotEmpty()
    readonly latitude!: number;
  
    @IsLongitude()
    @IsNotEmpty()
    readonly longitude!: number;
  }
