import { CreateBaseDto } from "@app/common/dto/base.create.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, IsUrl, ValidateNested } from "class-validator";

class PlanetPropertiesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  climate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  diameter: string;

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  films: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gravity: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orbital_period: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  population: string;

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  residents: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rotation_period: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surface_water: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  terrain: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}

export class CreatePlanetDto extends CreateBaseDto {
  @ApiProperty()
  @Type(() => PlanetPropertiesDto)
  @ValidateNested()
  properties: PlanetPropertiesDto;
}
