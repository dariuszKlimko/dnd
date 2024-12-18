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
  readonly characters: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  readonly planets: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  readonly starships: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  readonly vehicles: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  readonly species: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly producer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly episodeId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly director: string;

  @ApiProperty()
  @IsISO8601({ strict: true, strictSeparator: true })
  @Transform(({ value }) => {
    const isValidDate = isISO8601(value, { strict: true, strictSeparator: true });
    if (!isValidDate) {
      throw new Error(`Property "releaseDate" should be a valid ISO8601 date string`);
    }
    return new Date(value);
  })
  @IsNotEmpty()
  releaseDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly openingCrawl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly filmId: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly url: string;
}

export class CreateFilmDto {
  @ApiProperty({ type: () => FilmPropertiesDto })
  @Type(() => FilmPropertiesDto)
  @ValidateNested()
  readonly properties: FilmPropertiesDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

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
