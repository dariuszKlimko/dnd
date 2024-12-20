import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BasePropertyEntity } from "@app/common/entity/base.property.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Vehicle } from "@app/entities/vehicle/vehicle.entity";

@Entity("vehicles_properties")
export class VehicleProperty extends BasePropertyEntity {
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
      name: "max_atmosphering_speed",
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
    pilots: string[];

    @ApiProperty()
    @Column({
      type: "text",
      array: true,
      default: [],
    })
    films: string[];

    @ApiProperty()
    @Column({
      name: "vehicle_class",
      type: "text",
    })
    vehicleClass: string;

  @OneToOne(() => Vehicle, (vehicles: Vehicle) => vehicles.properties, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "vehicle_id" })
  vehicle: Vehicle;
}
