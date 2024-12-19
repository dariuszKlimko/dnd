import { NOT_ISO8601_DATE } from "@app/common/constans/constans";
import { NotIso8601Date } from "@app/common/exceptions/not.iso8601.date.exception";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  isISO8601,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";

class FilmPropertiesDto {
  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  characters: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  planets: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  starships: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  vehicles: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  species: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  producer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  episodeId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  director: string;

  @ApiProperty()
  @IsISO8601({ strict: true, strictSeparator: true })
  @Transform(({ value }) => {
    const isValidDate = isISO8601(value, { strict: true, strictSeparator: true });
    if (!isValidDate) {
      throw new NotIso8601Date(NOT_ISO8601_DATE);
    }
    const date = new Date(value);
    return date.toISOString();
  })
  @IsNotEmpty()
  releaseDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  openingCrawl: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}

export class CreateFilmDto {
  @ApiProperty()
  @Type(() => FilmPropertiesDto)
  @ValidateNested()
  properties: FilmPropertiesDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uid: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  v: number;
}
