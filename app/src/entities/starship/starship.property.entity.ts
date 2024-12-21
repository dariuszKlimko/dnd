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
    type: "text",
  })
  cargo_capacity: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  consumables: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  cost_in_credits: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  crew: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  hyperdrive_rating: string;

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
    type: "text",
  })
  max_atmosphering_speed: string;

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
    type: "text",
  })
  starship_class: string;

  @OneToOne(() => Starship, (starship: Starship) => starship.properties, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "starship_id" })
  starship: Starship;
}
