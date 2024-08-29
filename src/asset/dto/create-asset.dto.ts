import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  serial: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  location_id: number;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
