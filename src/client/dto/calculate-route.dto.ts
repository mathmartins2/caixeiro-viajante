import { IsArray, IsNotEmpty } from 'class-validator';

export class CalculateRouteDto {
  @IsNotEmpty()
  @IsArray()
  clientIds: string[];
}
