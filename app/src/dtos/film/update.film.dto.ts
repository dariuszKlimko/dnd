import { PartialType } from "@nestjs/swagger";
import { CreateFilmDto } from "@app/dtos/film/create.filmt.dto";

export class UpdateFilmDto extends PartialType(CreateFilmDto) {}
