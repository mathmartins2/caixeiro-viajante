import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class CalculateRouteDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  clientIds: string[];
}
