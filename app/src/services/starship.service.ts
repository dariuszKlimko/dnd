import { Injectable } from "@nestjs/common";
import { BaseAbstractService } from "@app/common/service/base.abstract.service";
import { Starship } from "@app/entities/starship/starship.entity";
import { StarshipServiceIntrface } from "@app/common/types/interfaces/services/starship.service.interface";
import { StarshipRepository } from "@app/repositories/starship.repository";

@Injectable()
export class StarshipService extends BaseAbstractService<Starship> implements StarshipServiceIntrface {
  constructor(starshipRepository: StarshipRepository) {
    super(starshipRepository);
  }
}
