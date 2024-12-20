import { PartialType } from "@nestjs/swagger";
import { CreateVehicleDto } from "@app/dtos/vehicles/create.vehicle.dto";

export class UpdateVehiclesDto extends PartialType(CreateVehicleDto) {}
