import { BaseInterfaceRepository } from "@app/common/repository/base.interface.repository";
import { Species } from "@app/entities/species/species.entity";

export interface SpeciesRepositoryInterface extends BaseInterfaceRepository<Species> {}
