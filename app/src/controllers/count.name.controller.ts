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
import { AxiosResponse } from "axios";
import { string } from "joi/lib";
import { CountNameService } from "@app/services/count.name.service";
import { UniqueService } from "@app/services/unique.service";
import { AxiosException } from "@app/common/exceptions/entity.not.found.exception copy";

@ApiTags("countname")
@UseFilters(HttpExceptionFilter)
@UseGuards(ThrottlerGuard)
@Controller("countname")
export class CountNameController {
  private readonly logger: Logger = new Logger(CountNameController.name);
  private readonly countNameService: CountNameService;
  private readonly uniqueService: UniqueService;

  constructor(countNameService: CountNameService, uniqueService: UniqueService) {
    this.countNameService = countNameService;
    this.uniqueService = uniqueService;
  }

  @ApiOperation({ summary: "Get most popular name." })
  @ApiOkResponse({ description: "Success.", type: [string] })
  @ApiBadRequestResponse({ description: "Error during to fetch data from external API." })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Get()
  async getCountName(): Promise<string[]> {
    try {
      const people: AxiosResponse = await this.countNameService.getPeopleFromExternalAPI();
      const names: string[] = this.countNameService.reducePersonToArrayOfName(people);
      const films: AxiosResponse = await this.uniqueService.getFilmsFromExternalAPI();
      const text: string = this.uniqueService.reduceOpeningCrawlToString(films);
      const countedWords: [string, number][] = this.uniqueService.countUniqueWords(text);
      const countedWordsMap: Map<string, number> = new Map(countedWords);
      const filteredNames: string[] = this.countNameService.findMostPopularName(names, countedWordsMap);
      return filteredNames;
    } catch (error) {
      if (error instanceof AxiosException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
