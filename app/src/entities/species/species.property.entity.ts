import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BasePropertyEntity } from "@app/common/entity/base.property.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Species } from "@app/entities/species/species.entity";

@Entity("species_properties")
export class SpeciesProperty extends BasePropertyEntity {
  @ApiProperty()
  @Column({
    name: "average_height",
    type: "text",
  })
  averageHeight: string;

  @ApiProperty()
  @Column({
    name: "average_lifespan",
    type: "text",
  })
  averageLifespan: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  classification: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  designation: string;

  @ApiProperty()
  @Column({
    name: "eye_colors",
    type: "text",
    default: "none",
  })
  eyeColors: string;

  @ApiProperty()
  @Column({
    name: "hair_colors",
    type: "text",
    default: "none",
  })
  hairColors: string;

  @ApiProperty()
  @Column({
    name: "skin_colors",
    type: "text",
    default: "none",
  })
  skinColors: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  homeworld: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  language: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  name: string;

  @ApiProperty()
  @Column({
    type: "text",
    array: true,
    default: [],
  })
  people: string[];

  @ApiProperty()
  @Column({
    type: "text",
    array: true,
    default: [],
  })
  films: string[];

  @OneToOne(() => Species, (species: Species) => species.properties, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "species_id" })
  species: Species;
}
