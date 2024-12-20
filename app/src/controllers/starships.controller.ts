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
import { StarshipServiceIntrface } from "@app/common/types/interfaces/services/starship.service.interface";
import { StarshipService } from "@app/services/starship.service";
import { Starship } from "@app/entities/starship/starship.entity";
import { CreateStarshipDto } from "@app/dtos/starship/create.starship.dto";

@ApiTags("starships")
@UseFilters(HttpExceptionFilter)
@UseGuards(ThrottlerGuard)
@Controller("starships")
export class StarshipController {
  private readonly logger: Logger = new Logger(StarshipController.name);
  private readonly starshipService: StarshipServiceIntrface;
  private cacheManager: Cache;

  constructor(starshipService: StarshipService, @Inject(CACHE_MANAGER) cacheManager: Cache) {
    this.starshipService = starshipService;
    this.cacheManager = cacheManager;
  }

  @ApiOperation({ summary: "Get all starships for given conditions." })
  @ApiOkResponse({ description: "Success.", type: [Starship] })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @ApiQuery({ name: "skip", required: false, type: Number })
  @ApiQuery({ name: "take", required: false, type: Number })
  @ApiQuery({ name: "name", required: false, type: String })
  @ApiQuery({ name: "model", required: false, type: String })
  @Get()
  async getAllStarshipsWithConditiion(
    @Query("skip") skip?: number,
    @Query("take") take?: number,
    @Query("name") name?: string,
    @Query("model") model?: string
  ): Promise<[Starship[], number]> {
    try {
      return await this.starshipService.findAllByCondition(
        { properties: { name, model } },
        skip,
        take,
        ["properties"]
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Get starship by id." })
  @ApiOkResponse({ description: "Success.", type: Starship })
  @ApiNotFoundResponse({ description: "Starship not found" })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Get("/:id")
  async getVehicleById(@Param("id") id: string): Promise<Starship> {
    try {
      return await this.starshipService.findOneByIdOrThrow(id, ["properties"]);
    } catch (error) {
      if (error instanceof EntityNotFound) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

    @ApiOperation({ summary: "Create starship." })
    @ApiCreatedResponse({ description: "Success.", type: Starship })
    @ApiInternalServerErrorResponse({ description: "Internal server error." })
    @Post()
    async createVehicle(@Body() vehiclePayload: CreateStarshipDto): Promise<Starship> {
      try {
        const starship: Starship = await this.starshipService.createOne(vehiclePayload);
        return await this.starshipService.saveOneByEntity(starship);
      } catch (error) {
        if (error instanceof EntityNotFound) {
          throw new NotFoundException(error.message);
        }
        throw new InternalServerErrorException();
      }
    }
}
