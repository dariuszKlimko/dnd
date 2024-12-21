import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BasePropertyEntity } from "@app/common/entity/base.property.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Species } from "@app/entities/species/species.entity";

@Entity("species_properties")
export class SpeciesProperty extends BasePropertyEntity {
  @ApiProperty()
  @Column({
    type: "text",
  })
  average_height: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  average_lifespan: string;

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
    type: "text",
    default: "none",
  })
  eye_colors: string;

  @ApiProperty()
  @Column({
    type: "text",
    default: "none",
  })
  hair_colors: string;

  @ApiProperty()
  @Column({
    type: "text",
    default: "none",
  })
  skin_colors: string;

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
