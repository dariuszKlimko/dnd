import { Entity, OneToOne } from "typeorm";
import { BaseEntity } from "@app/common/entity/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { StarshipProperty } from "@app/entities/starship/starship.property.entity";

@Entity("starships")
export class Starship extends BaseEntity {
  @ApiProperty()
  @OneToOne(() => StarshipProperty, (properties: StarshipProperty) => properties.starship, {
    cascade: true,
  })
  properties: StarshipProperty;
}
