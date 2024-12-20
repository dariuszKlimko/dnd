import { Injectable } from "@nestjs/common";
import { BaseAbstractService } from "@app/common/service/base.abstract.service";
import { Vehicle } from "@app/entities/vehicle/vehicle.entity";
import { VehicleServiceIntrface } from "@app/common/types/interfaces/services/vehicle.service.interface";
import { VehicleRepository } from "@app/repositories/vehicle.repository";

@Injectable()
export class VehicleService extends BaseAbstractService<Vehicle> implements VehicleServiceIntrface {
  constructor(vehicleRepository: VehicleRepository) {
    super(vehicleRepository);
  }
}
