import { Injectable } from "@nestjs/common";
import { BaseAbstractService } from "@app/common/service/base.abstract.service";
import { Planet } from "@app/entities/planet/planet.entity";
import { PlanetServiceIntrface } from "@app/common/types/interfaces/services/planet.service.interface";
import { PlanetRepository } from "@app/repositories/planet.repository";

@Injectable()
export class PlanetService extends BaseAbstractService<Planet> implements PlanetServiceIntrface {
  constructor(planetRepository: PlanetRepository) {
    super(planetRepository);
  }
}
