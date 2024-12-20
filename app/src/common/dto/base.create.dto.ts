import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBaseDto {
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
