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
export class VehiclesController {
  private readonly logger: Logger = new Logger(VehiclesController.name);
  private readonly vehiclesService: VehicleServiceIntrface;
  private cacheManager: Cache;

  constructor(vehiclesService: VehicleService, @Inject(CACHE_MANAGER) cacheManager: Cache) {
    this.vehiclesService = vehiclesService;
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
      const vehicles: [Vehicle[], number] = await this.vehiclesService.findAllByCondition(
        { properties: { name, model } },
        skip,
        take,
        ["properties"]
      );
      return vehicles;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Get vehicle by id." })
  @ApiOkResponse({ description: "Success.", type: Vehicle })
  @ApiNotFoundResponse({ description: "Vehicle not found" })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Get("/:id")
  async getVehicleById(@Param("id") id: string): Promise<Vehicle> {
    try {
      const vehicle = await this.vehiclesService.findOneByIdOrThrow(id, ["properties"]);
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
        const vehicle: Vehicle = await this.vehiclesService.createOne(vehiclePayload);
        return await this.vehiclesService.saveOneByEntity(vehicle);
      } catch (error) {
        if (error instanceof EntityNotFound) {
          throw new NotFoundException(error.message);
        }
        throw new InternalServerErrorException();
      }
    }
}
