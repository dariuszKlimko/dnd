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
import { SpeciesServiceIntrface } from "@app/common/types/interfaces/services/species.service.interface";
import { SpeciesService } from "@app/services/species.service";
import { Species } from "@app/entities/species/species.entity";
import { CreateSpeciesDto } from "@app/dtos/species/create.species.dto";

@ApiTags("species")
@UseFilters(HttpExceptionFilter)
@UseGuards(ThrottlerGuard)
@Controller("species")
export class SpeciesController {
  private readonly logger: Logger = new Logger(SpeciesController.name);
  private readonly speciesService: SpeciesServiceIntrface;
  private cacheManager: Cache;

  constructor(speciesService: SpeciesService, @Inject(CACHE_MANAGER) cacheManager: Cache) {
    this.speciesService = speciesService;
    this.cacheManager = cacheManager;
  }

  @ApiOperation({ summary: "Get all species for given conditions." })
  @ApiOkResponse({ description: "Success.", type: [Species] })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @ApiQuery({ name: "skip", required: false, type: Number })
  @ApiQuery({ name: "take", required: false, type: Number })
  @ApiQuery({ name: "name", required: false, type: String })
  @Get()
  async getAllSpeciesWithConditiion(
    @Query("skip") skip?: number,
    @Query("take") take?: number,
    @Query("name") name?: string
  ): Promise<[Species[], number]> {
    try {
      const cacheKey = `${skip}+${take}+${name}+${SpeciesController.name}`;
      const value: [Species[], number] = await this.cacheManager.get(cacheKey);
      if (value) {
        return value;
      }
      const species: [Species[], number] = await this.speciesService.findAllByCondition(
        { properties: { name } },
        skip,
        take,
        ["properties"]
      );
      await this.cacheManager.set(cacheKey, species);
      return species;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Get species by uid." })
  @ApiOkResponse({ description: "Success.", type: Species })
  @ApiNotFoundResponse({ description: "Species not found" })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Get("/:uid")
  async getSpeciesByUid(@Param("uid") uid: number): Promise<Species> {
    try {
      const cacheKey = `${String(uid)}+${SpeciesController.name}`;
      const value: Species = await this.cacheManager.get(cacheKey);
      if (value) {
        return value;
      }
      const species: Species = await this.speciesService.findOneByConditionOrThrow({ uid }, ["properties"]);
      await this.cacheManager.set(cacheKey, species);
      return species;
    } catch (error) {
      if (error instanceof EntityNotFound) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Create species." })
  @ApiCreatedResponse({ description: "Success.", type: Species })
  @ApiNotFoundResponse({ description: "Species not found" })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Post()
  async createSpecies(@Body() speciesPayload: CreateSpeciesDto): Promise<Species> {
    try {
      const species: Species = await this.speciesService.createOne(speciesPayload);
      return await this.speciesService.saveOneByEntity(species);
    } catch (error) {
      if (error instanceof EntityNotFound) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
