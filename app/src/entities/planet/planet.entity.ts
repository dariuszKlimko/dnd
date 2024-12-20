import { Entity, OneToOne } from "typeorm";
import { BaseEntity } from "@app/common/entity/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { PlanetProperty } from "@app/entities/planet/planet.property.entity";

@Entity("planets")
export class Planet extends BaseEntity {
  @ApiProperty()
  @OneToOne(() => PlanetProperty, (properties: PlanetProperty) => properties.planet, {
    cascade: true,
  })
  properties: PlanetProperty;
}
