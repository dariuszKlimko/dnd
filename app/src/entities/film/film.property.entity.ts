import { AfterLoad, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BasePropertyEntity } from "@app/common/entity/base.property.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Film } from "@app/entities/film/film.entity";

@Entity("film_properties")
export class FilmProperty extends BasePropertyEntity {
  @ApiProperty()
  @Column({
    type: "text",
    array: true,
    default: [],
  })
  characters: string[];

  @ApiProperty()
  @Column({
    type: "text",
    array: true,
    default: [],
  })
  planets: string[];

  @ApiProperty()
  @Column({
    type: "text",
    array: true,
    default: [],
  })
  starships: string[];

  @ApiProperty()
  @Column({
    type: "text",
    array: true,
    default: [],
  })
  vehicles: string[];

  @ApiProperty()
  @Column({
    type: "text",
    array: true,
    default: [],
  })
  species: string[];

  @ApiProperty()
  @Column({
    type: "text",
  })
  producer: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  title: string;

  @ApiProperty()
  @Column({
    name: "episode_id",
    type: "integer",
  })
  episodeId: number;

  @ApiProperty()
  @Column({
    type: "text",
  })
  director: string;

  @ApiProperty()
  @Column({
    name: "release_date",
    type: "varchar",
    length: 32,
  })
  releaseDate: string;

  @ApiProperty()
  @Column({
    name: "opening_crawl",
    type: "text",
  })
  openingCrawl: string;

  @OneToOne(() => Film, (film: Film) => film.properties, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "film_id" })
  film: Film;

  @AfterLoad()
  updateReleaseDate(): void {
    this.releaseDate = this.releaseDate.slice(0, 10);
  }
}
