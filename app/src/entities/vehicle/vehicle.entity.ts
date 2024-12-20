import { Entity, OneToOne } from "typeorm";
import { BaseEntity } from "@app/common/entity/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { VehicleProperty } from "@app/entities/vehicle/vehicle.property.entity";

@Entity("vehicles")
export class Vehicle extends BaseEntity {
  @ApiProperty()
  @OneToOne(() => VehicleProperty, (properties: VehicleProperty) => properties.vehicle, {
    cascade: true,
  })
  properties: VehicleProperty;
}
