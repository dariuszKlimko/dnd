import { Entity, OneToOne } from "typeorm";
import { BaseEntity } from "@app/common/entity/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { SpeciesProperty } from "@app/entities/species/species.property.entity";

@Entity("species")
export class Species extends BaseEntity {
  @ApiProperty()
  @OneToOne(() => SpeciesProperty, (properties: SpeciesProperty) => properties.species, {
    cascade: true,
  })
  properties: SpeciesProperty;
}
