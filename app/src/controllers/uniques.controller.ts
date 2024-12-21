import { Controller, Get, InternalServerErrorException, Logger, UseFilters, UseGuards } from "@nestjs/common";
import { HttpExceptionFilter } from "@app/common/filter/http.exception.filter";
import { ApiInternalServerErrorResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ThrottlerGuard } from "@nestjs/throttler";
import { UniqueService } from "@app/services/unique.service";
import { AxiosResponse } from "axios";

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
  // @ApiOkResponse({ description: "Success.", type: ([string, number]) })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  @Get()
  async getUniqueWords(): Promise<[string, number][]> {
    try {
      const films: AxiosResponse = await this.uniqueService.getFilmsFromExternalAPI();
      const text: string = this.uniqueService.reduceOpeningCrawlToString(films);
      return this.uniqueService.countUniqueWords(text);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
