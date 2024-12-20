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
import { FilmService } from "@app/services/film.service";
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
import { Film } from "@app/entities/film/film.entity";
import { EntityNotFound } from "@app/common/exceptions/entity.not.found.exception";
import { FilmServiceIntrface } from "@app/common/types/interfaces/services/film.service.interface";
import { ThrottlerGuard } from "@nestjs/throttler";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { CreateFilmDto } from "@app/dtos/film/create.filmt.dto";

@ApiTags("films")
@UseFilters(HttpExceptionFilter)
@UseGuards(ThrottlerGuard)
@Controller("films")
export class FilmController {
  private readonly logger: Logger = new Logger(FilmController.name);
  private readonly filmService: FilmServiceIntrface;
  private cacheManager: Cache;

  constructor(filmService: FilmService, @Inject(CACHE_MANAGER) cacheManager: Cache) {
    this.filmService = filmService;
    this.cacheManager = cacheManager;
  }

  @ApiOperation({ summary: "Get all films for given conditions." })
  @ApiOkResponse({ description: "Success.", type: [Film] })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @ApiQuery({ name: "skip", required: false, type: Number })
  @ApiQuery({ name: "take", required: false, type: Number })
  @ApiQuery({ name: "title", required: false, type: String })
  @Get()
  async getAllFilmsWithConditiion(
    @Query("skip") skip?: number,
    @Query("take") take?: number,
    @Query("title") title?: string
  ): Promise<[Film[], number]> {
    try {
      const films: [Film[], number] = await this.filmService.findAllByCondition(
        { properties: { title } },
        skip,
        take,
        ["properties"]
      );
      return films;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Get film by id." })
  @ApiOkResponse({ description: "Success.", type: Film })
  @ApiNotFoundResponse({ description: "Film not found" })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Get("/:id")
  async getFilmById(@Param("id") id: string): Promise<Film> {
    try {
      const film = await this.filmService.findOneByIdOrThrow(id, ["properties"]);
      return film;
    } catch (error) {
      if (error instanceof EntityNotFound) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Create film." })
  @ApiCreatedResponse({ description: "Success.", type: Film })
  @ApiNotFoundResponse({ description: "Film not found" })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Post()
  async createMeasurement(@Body() filmPayload: CreateFilmDto): Promise<Film> {
    try {
      const film: Film = await this.filmService.createOne(filmPayload);
      return await this.filmService.saveOneByEntity(film);
    } catch (error) {
      if (error instanceof EntityNotFound) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
