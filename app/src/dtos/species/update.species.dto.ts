import { PartialType } from "@nestjs/swagger";
import { CreateSpeciesDto } from "@app/dtos/species/create.species.dto";

export class UpdateSpeciesDto extends PartialType(CreateSpeciesDto) {}
