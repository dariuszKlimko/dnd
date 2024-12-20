import { BaseAbstractRepository } from "@app/common/repository/base.abstract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VEHICLE_NOT_FOUND } from "@app/common/constans/constans";
import { Vehicle } from "@app/entities/vehicle/vehicle.entity";
import { VehicleRepositoryInterface } from "@app/common/types/interfaces/repositories/vehicle.repository.interface";

export class VehicleRepository extends BaseAbstractRepository<Vehicle> implements VehicleRepositoryInterface {
  constructor(@InjectRepository(Vehicle) vehiclesRepository: Repository<Vehicle>) {
    super(vehiclesRepository, VEHICLE_NOT_FOUND);
  }
}
