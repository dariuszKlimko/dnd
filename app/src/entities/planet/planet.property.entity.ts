import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BasePropertyEntity } from "@app/common/entity/base.property.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Planet } from "@app/entities/planet/planet.entity";

@Entity("planets_properties")
export class PlanetProperty extends BasePropertyEntity {
  @ApiProperty()
  @Column({
    type: "text",
  })
  climate: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  diameter: string;

  @ApiProperty()
  @Column({
    type: "text",
    array: true,
    default: [],
  })
  films: string[];

  @ApiProperty()
  @Column({
    type: "text",
  })
  gravity: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  name: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  orbital_period: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  population: string;

  @ApiProperty()
  @Column({
    type: "text",
    array: true,
    default: [],
  })
  residents: string[];

  @ApiProperty()
  @Column({
    type: "text",
  })
  rotation_period: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  surface_water: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  terrain: string;

  @OneToOne(() => Planet, (planet: Planet) => planet.properties, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "planet_id" })
  planet: Planet;
}
