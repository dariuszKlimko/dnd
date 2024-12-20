import { CreateBaseDto } from "@app/common/dto/base.create.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, IsUrl, ValidateNested } from "class-validator";

class SpeciesPropertiesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  averageHeight: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  averageLifespan: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  classification: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  eyeColors: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  hairColors: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  skinColors: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  homeworld: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  people: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  films: string[];

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}

export class CreateSpeciesDto extends CreateBaseDto {
  @ApiProperty()
  @Type(() => SpeciesPropertiesDto)
  @ValidateNested()
  properties: SpeciesPropertiesDto;
}
