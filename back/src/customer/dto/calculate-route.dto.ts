import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class CalculateRouteDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  clientIds: string[];
}
