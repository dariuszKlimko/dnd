import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { HttpExceptionFilter } from "@app/common/filter/http.exception.filter";
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { EntityNotFound } from "@app/common/exceptions/entity.not.found.exception";
import { ThrottlerGuard } from "@nestjs/throttler";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { VehicleServiceIntrface } from "@app/common/types/interfaces/services/vehicle.service.interface";
import { VehicleService } from "@app/services/vehicle.service";
import { Vehicle } from "@app/entities/vehicle/vehicle.entity";
import { CreateVehicleDto } from "@app/dtos/vehicles/create.vehicle.dto";

@ApiTags("vehicles")
@UseFilters(HttpExceptionFilter)
@UseGuards(ThrottlerGuard)
@Controller("vehicles")
export class VehicleController {
  private readonly logger: Logger = new Logger(VehicleController.name);
  private readonly vehicleService: VehicleServiceIntrface;
  private cacheManager: Cache;

  constructor(vehicleService: VehicleService, @Inject(CACHE_MANAGER) cacheManager: Cache) {
    this.vehicleService = vehicleService;
    this.cacheManager = cacheManager;
  }

  @ApiOperation({ summary: "Get all vehicles for given conditions." })
  @ApiOkResponse({ description: "Success.", type: [Vehicle] })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @ApiQuery({ name: "skip", required: false, type: Number })
  @ApiQuery({ name: "take", required: false, type: Number })
  @ApiQuery({ name: "name", required: false, type: String })
  @ApiQuery({ name: "model", required: false, type: String })
  @Get()
  async getAllVehiclesWithConditiion(
    @Query("skip") skip?: number,
    @Query("take") take?: number,
    @Query("name") name?: string,
    @Query("model") model?: string
  ): Promise<[Vehicle[], number]> {
    try {
      const cacheKey = `${skip}+${take}+${name}+${model}+${VehicleController.name}`;
      const value: [Vehicle[], number] = await this.cacheManager.get(cacheKey);
      if (value) {
        return value;
      }
      const vehicles: [Vehicle[], number] = await this.vehicleService.findAllByCondition(
        { properties: { name, model } },
        skip,
        take,
        ["properties"]
      );
      await this.cacheManager.set(cacheKey, vehicles);
      return vehicles;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Get vehicle by uid." })
  @ApiOkResponse({ description: "Success.", type: Vehicle })
  @ApiNotFoundResponse({ description: "Vehicle not found" })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Get("/:uid")
  async getVehicleByUid(@Param("uid") uid: number): Promise<Vehicle> {
    try {
      const cacheKey = `${String(uid)}+${VehicleController.name}`;
      const value: Vehicle = await this.cacheManager.get(cacheKey);
      if (value) {
        return value;
      }
      const vehicle: Vehicle = await this.vehicleService.findOneByConditionOrThrow({ uid }, ["properties"]);
      await this.cacheManager.set(cacheKey, vehicle);
      return vehicle;
    } catch (error) {
      if (error instanceof EntityNotFound) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Create vehicle." })
  @ApiCreatedResponse({ description: "Success.", type: Vehicle })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Post()
  async createVehicle(@Body() vehiclePayload: CreateVehicleDto): Promise<Vehicle> {
    try {
      const vehicle: Vehicle = await this.vehicleService.createOne(vehiclePayload);
      return await this.vehicleService.saveOneByEntity(vehicle);
    } catch (error) {
      if (error instanceof EntityNotFound) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
