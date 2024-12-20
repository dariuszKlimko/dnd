import { PartialType } from "@nestjs/swagger";
import { CreatePlanetDto } from "@app/dtos/planet/create.planet.dto";

export class UpdatePlanetDto extends PartialType(CreatePlanetDto) {}
