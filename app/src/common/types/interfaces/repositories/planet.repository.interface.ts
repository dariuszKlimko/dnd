import { BaseInterfaceRepository } from "@app/common/repository/base.interface.repository";
import { Planet } from "@app/entities/planet/planet.entity";

export interface PlanetRepositoryInterface extends BaseInterfaceRepository<Planet> {}
