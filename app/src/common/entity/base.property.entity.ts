import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { BaseEntity as TypeOrmBaseEntity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";

export class BasePropertyEntity extends TypeOrmBaseEntity {
  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  @PrimaryColumn({
    type: "varchar",
    length: 32,
    name: "_id",
  })
  id: string;

  @ApiProperty()
  @Column({
    type: "text",
  })
  url: string;

  @ApiProperty()
  @Column({
    type: "varchar",
    length: 32,
  })
  created: string;

  @ApiProperty()
  @Column({
    type: "varchar",
    length: 32,
  })
  edited: string;

  @BeforeInsert()
  creatCurrentDate(): void {
    const currentDate = new Date();
    this.created = currentDate.toISOString();
  }

  @BeforeUpdate()
  editCurrentDate(): void {
    const currentDate = new Date();
    this.edited = currentDate.toISOString();
  }
}
