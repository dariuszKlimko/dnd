import { NOT_ISO8601_DATE } from "@app/common/constans/constans";
import { CreateBaseDto } from "@app/common/dto/base.create.dto";
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
  episode_id: number;

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
  release_date: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  opening_crawl: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}

export class CreateFilmDto extends CreateBaseDto {
  @ApiProperty()
  @Type(() => FilmPropertiesDto)
  @ValidateNested()
  properties: FilmPropertiesDto;
}
