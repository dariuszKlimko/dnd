import { BaseAbstractRepository } from "@app/common/repository/base.abstract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { STARSHIP_NOT_FOUND } from "@app/common/constans/constans";
import { Starship } from "@app/entities/starship/starship.entity";
import { StarshipRepositoryInterface } from "@app/common/types/interfaces/repositories/starship.repository.interface";

export class StarshipRepository extends BaseAbstractRepository<Starship> implements StarshipRepositoryInterface {
  constructor(@InjectRepository(Starship) starshipRepository: Repository<Starship>) {
    super(starshipRepository, STARSHIP_NOT_FOUND);
  }
}
