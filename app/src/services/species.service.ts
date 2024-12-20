import { Injectable } from "@nestjs/common";
import { BaseAbstractService } from "@app/common/service/base.abstract.service";
import { Species } from "@app/entities/species/species.entity";
import { SpeciesServiceIntrface } from "@app/common/types/interfaces/services/species.service.interface";
import { SpeciesRepository } from "@app/repositories/species.repository";

@Injectable()
export class SpeciesService extends BaseAbstractService<Species> implements SpeciesServiceIntrface {
  constructor(speciesRepository: SpeciesRepository) {
    super(speciesRepository);
  }
}
