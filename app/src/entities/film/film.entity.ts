import { Entity, OneToOne } from "typeorm";
import { BaseEntity } from "@app/common/entity/base.entity";
import { FilmProperty } from "@app/entities/film/film.property.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("films")
export class Film extends BaseEntity {
  @ApiProperty()
  @OneToOne(() => FilmProperty, (properties: FilmProperty) => properties.film, {
    cascade: true,
  })
  properties: FilmProperty;
}
