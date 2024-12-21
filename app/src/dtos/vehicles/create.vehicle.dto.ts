import { CreateBaseDto } from "@app/common/dto/base.create.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, IsUrl, ValidateNested } from "class-validator";

class VehiclePropertiesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cargo_capacity: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  consumables: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cost_in_credits: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  crew: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  length: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  max_atmosphering_speed: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  passengers: string;

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  pilots: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  films: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vehicle_class: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}

export class CreateVehicleDto extends CreateBaseDto {
  @ApiProperty()
  @Type(() => VehiclePropertiesDto)
  @ValidateNested()
  properties: VehiclePropertiesDto;
}
