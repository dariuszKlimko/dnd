import { Film } from "@app/entities/film/film.entity";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosResponse } from "axios";

@Injectable()
export class UniqueService {
  private readonly configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  async getFilmsFromExternalAPI(): Promise<AxiosResponse> {
    try {
      const reponse: AxiosResponse = await axios.get(this.configService.get("EXTERNAL_FILMS_API"));
      return reponse;
    } catch (error) {
      throw new Error(error);
    }
  }

  reduceOpeningCrawlToString(films: AxiosResponse): string {
    return films.data.result.reduce((acc: string, film: Film) => {
      return acc + film.properties.opening_crawl;
    }, "");
  }

  countUniqueWords(text: string): [string, number][] {
    const allText = [text].join(" ").toLowerCase();
    const words = allText.replace(/[^\w\s]/g, "").split(/\s+/);
    const result = words.reduce((acc: { [key: string]: number }, word: string) => {
      if (word) {
        acc[word] = (acc[word] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(result);
  }
}
