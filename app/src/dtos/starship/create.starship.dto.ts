import { CreateBaseDto } from "@app/common/dto/base.create.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, IsUrl, ValidateNested } from "class-validator";

class StarshipPropertiesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  MGLT: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cargoCapacity: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  consumables: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  costInCredits: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  crew: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  hyperdriveRating: string;

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
  maxAtmospheringSpeed: string;

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
  films: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  pilots: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  starshipClass: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}

export class CreateStarshipDto extends CreateBaseDto {
  @ApiProperty()
  @Type(() => StarshipPropertiesDto)
  @ValidateNested()
  properties: StarshipPropertiesDto;
}
