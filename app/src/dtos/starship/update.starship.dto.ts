import { PartialType } from "@nestjs/swagger";
import { CreateStarshipDto } from "@app/dtos/starship/create.starship.dto";

export class UpdateStarshipDto extends PartialType(CreateStarshipDto) {}
