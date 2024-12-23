import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { HttpExceptionFilter } from "@app/common/filter/http.exception.filter";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ThrottlerGuard } from "@nestjs/throttler";
import { UniqueService } from "@app/services/unique.service";
import { AxiosResponse } from "axios";
import { number, string } from "joi/lib";
import { AxiosException } from "@app/common/exceptions/entity.not.found.exception copy";

@ApiTags("uniques")
@UseFilters(HttpExceptionFilter)
@UseGuards(ThrottlerGuard)
@Controller("uniques")
export class UniqueController {
  private readonly logger: Logger = new Logger(UniqueController.name);
  private readonly uniqueService: UniqueService;

  constructor(uniqueService: UniqueService) {
    this.uniqueService = uniqueService;
  }

  @ApiOperation({ summary: "Get unique words." })
  @ApiOkResponse({ description: "Success.", type: "object", example: Object([string, number]) })
  @ApiBadRequestResponse({ description: "Error during to fetch data from external API." })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Get()
  async getUniqueWords(): Promise<[string, number][]> {
    try {
      const films: AxiosResponse = await this.uniqueService.getFilmsFromExternalAPI();
      const text: string = this.uniqueService.reduceOpeningCrawlToString(films);
      return this.uniqueService.countUniqueWords(text);
    } catch (error) {
      if (error instanceof AxiosException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
