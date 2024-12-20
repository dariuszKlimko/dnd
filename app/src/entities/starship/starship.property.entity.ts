import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BasePropertyEntity } from "@app/common/entity/base.property.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Starship } from "@app/entities/starship/starship.entity";

@Entity("starships_properties")
export class StarshipProperty extends BasePropertyEntity {
  @ApiProperty()
  @Column({
    type: "text",
  })
  MGLT: string;

  @ApiProperty()
  @Column({
    name: "cargo_capacity",
    type: "text",
  })
  cargoCapacity: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  consumables: string;

  @ApiProperty()
  @Column({
    name: "cost_in_credits",
    type: "text",
  })
  costInCredits: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  crew: string;

  @ApiProperty()
  @Column({
    name: "hyperdriveRating",
    type: "text",
  })
  hyperdriveRating: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  length: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  manufacturer: string;

  @ApiProperty()
  @Column({
    name: "max_a+tmosphering_speed",
    type: "text",
  })
  maxAtmospheringSpeed: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  model: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  name: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  passengers: string;

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
    array: true,
    default: [],
  })
  pilots: string[];

  @ApiProperty()
  @Column({
    name: "starship_class",
    type: "text",
  })
  starshipClass: string;

  @OneToOne(() => Starship, (starship: Starship) => starship.properties, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "starship_id" })
  starship: Starship;
}
