import { ApiProperty } from "@nestjs/swagger";
import { randomBytes } from "crypto";
import { BaseEntity as TypeOrmBaseEntity, Column, PrimaryColumn, BeforeInsert, Generated } from "typeorm";

export class BaseEntity extends TypeOrmBaseEntity {
  @ApiProperty()
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
  description: string;

  @ApiProperty()
  @Generated("increment")
  uid: number;

  @ApiProperty()
  @Column({
    name: "__v",
    type: "int",
  })
  v: number;

  @BeforeInsert()
  generateHexId(): void {
    this.id = randomBytes(16).toString("hex");
  }
}
