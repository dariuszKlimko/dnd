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
import { PlanetServiceIntrface } from "@app/common/types/interfaces/services/planet.service.interface";
import { PlanetService } from "@app/services/planet.service";
import { Planet } from "@app/entities/planet/planet.entity";
import { CreatePlanetDto } from "@app/dtos/planet/create.planet.dto";

@ApiTags("planets")
@UseFilters(HttpExceptionFilter)
@UseGuards(ThrottlerGuard)
@Controller("planets")
export class PlanetController {
  private readonly logger: Logger = new Logger(PlanetController.name);
  private readonly planetService: PlanetServiceIntrface;
  private cacheManager: Cache;

  constructor(planetService: PlanetService, @Inject(CACHE_MANAGER) cacheManager: Cache) {
    this.planetService = planetService;
    this.cacheManager = cacheManager;
  }

  @ApiOperation({ summary: "Get all planets for given conditions." })
  @ApiOkResponse({ description: "Success.", type: [Planet] })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @ApiQuery({ name: "skip", required: false, type: Number })
  @ApiQuery({ name: "take", required: false, type: Number })
  @ApiQuery({ name: "name", required: false, type: String })
  @Get()
  async getAllPlanetsWithConditiion(
    @Query("skip") skip?: number,
    @Query("take") take?: number,
    @Query("name") name?: string,
  ): Promise<[Planet[], number]> {
    try {
      const cacheKey = `${skip}+${take}+${name}+${PlanetController.name}`;
      const value: [Planet[], number] = await this.cacheManager.get(cacheKey);
      if (value) {
          return value;
      }
      const planets: [Planet[], number] = await this.planetService.findAllByCondition(
        { properties: { name } },
        skip,
        take,
        ["properties"]
      );
      await this.cacheManager.set(cacheKey, planets);
      return planets;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Get planet by uid." })
  @ApiOkResponse({ description: "Success.", type: Planet })
  @ApiNotFoundResponse({ description: "Planet not found" })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Get("/:uid")
  async getPlanetByUid(@Param("uid") uid: number): Promise<Planet> {
    try {
      const cacheKey = `${String(uid)}+${PlanetController.name}`;
      const value: Planet = await this.cacheManager.get(cacheKey);
      if (value) {
        return value;
      }
      const planet: Planet = await this.planetService.findOneByConditionOrThrow({ uid }, ["properties"]);
      await this.cacheManager.set(cacheKey, planet);
      return planet;
    } catch (error) {
      if (error instanceof EntityNotFound) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

    @ApiOperation({ summary: "Create planet." })
    @ApiCreatedResponse({ description: "Success.", type: Planet })
    @ApiInternalServerErrorResponse({ description: "Internal server error." })
    @Post()
    async createPlanet(@Body() planetPayload: CreatePlanetDto): Promise<Planet> {
      try {
        const planet: Planet = await this.planetService.createOne(planetPayload);
        return await this.planetService.saveOneByEntity(planet);
      } catch (error) {
        if (error instanceof EntityNotFound) {
          throw new NotFoundException(error.message);
        }
        throw new InternalServerErrorException();
      }
    }
}
