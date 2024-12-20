import { BaseInterfaceRepository } from "@app/common/repository/base.interface.repository";
import { Vehicle } from "@app/entities/vehicle/vehicle.entity";

export interface VehicleRepositoryInterface extends BaseInterfaceRepository<Vehicle> {}
