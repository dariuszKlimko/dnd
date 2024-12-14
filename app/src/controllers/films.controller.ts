import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { FilmService } from "@app/services/film.service";
import { HttpExceptionFilter } from "@app/common/filter/http.exception.filter";
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { Film } from "@app/entities/film.entity";
import { EntityNotFound } from "@app/common/exceptions/entity.not.found.exception";
import { FilmServiceIntrface } from "@app/common/types/interfaces/services/film.service.interface";
import { ThrottlerGuard } from "@nestjs/throttler";

@ApiTags("films")
@UseFilters(HttpExceptionFilter)
@UseGuards(ThrottlerGuard)
@Controller("films")
export class FilmController {
  private readonly logger: Logger = new Logger(FilmController.name);
  private readonly filmService: FilmServiceIntrface;

  constructor(filmService: FilmService) {
    this.filmService = filmService;
  }

  @ApiOperation({ summary: "Get all films for given conditions." })
  @ApiOkResponse({ description: "Success.", type: [Film] })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Get()
  async getAllAllFilmsWithConditiion(    
    @Query("skip", ParseIntPipe) skip: number,
    @Query("take", ParseIntPipe) take: number, 
    @Query() query: Partial<Film>,
  ): Promise<[Film[], number]> {
    try {
      return await this.filmService.findAllByCondition({ query }, skip, take);
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
      const url = `http://swapi.dev/api/films/${id}/`
      return await this.filmService.findOneByConditionOrThrow({ url });
    } catch (error) {
      if (error instanceof EntityNotFound) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
