import { BaseAbstractRepository } from "@app/common/repository/base.abstract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SPECIES_NOT_FOUND } from "@app/common/constans/constans";
import { Species } from "@app/entities/species/species.entity";
import { SpeciesRepositoryInterface } from "@app/common/types/interfaces/repositories/species.repository.interface";

export class SpeciesRepository extends BaseAbstractRepository<Species> implements SpeciesRepositoryInterface {
  constructor(@InjectRepository(Species) speciesRepository: Repository<Species>) {
    super(speciesRepository, SPECIES_NOT_FOUND);
  }
}
