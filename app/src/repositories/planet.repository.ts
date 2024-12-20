import { BaseAbstractRepository } from "@app/common/repository/base.abstract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PLANET_NOT_FOUND } from "@app/common/constans/constans";
import { Planet } from "@app/entities/planet/planet.entity";
import { PlanetRepositoryInterface } from "@app/common/types/interfaces/repositories/planet.repository.interface";

export class PlanetRepository extends BaseAbstractRepository<Planet> implements PlanetRepositoryInterface {
  constructor(@InjectRepository(Planet) planetRepository: Repository<Planet>) {
    super(planetRepository, PLANET_NOT_FOUND);
  }
}
