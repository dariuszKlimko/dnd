import { BaseInterfaceService } from "@app/common/service/base.interface.service";
import { Planet } from "@app/entities/planet/planet.entity";

export interface PlanetServiceIntrface extends BaseInterfaceService<Planet> {}
