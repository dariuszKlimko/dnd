import { AxiosException } from "@app/common/exceptions/entity.not.found.exception copy";
import { Person } from "@app/common/types/type/person";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosResponse } from "axios";

@Injectable()
export class CountNameService {
  private readonly configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  async getPeopleFromExternalAPI(): Promise<AxiosResponse> {
    try {
      const reponse: AxiosResponse = await axios.get(this.configService.get("EXTERNAL_PEOPLE_API"));
      return reponse;
    } catch (error) {
      throw new AxiosException(error);
    }
  }

  reducePersonToArrayOfName(people: AxiosResponse): string[] {
    const fullNames: string[] = people.data.results.reduce((acc: string[], person: Person) => {
      acc.push(person.name);
      return acc;
    }, []);

    const names: string[] = fullNames.filter((name) => !name.includes("-"));

    return names.map((name) => {
      return name.split(" ")[0].toLowerCase();
    });
  }

  findMostPopularName(names: string[], wordsMap: Map<string, number>): string[] {
    let topValue = 0;
    let filteredNames: string[] = [];
    names.forEach((name) => {
      if (topValue < wordsMap.get(name)) {
        topValue = wordsMap.get(name);
        filteredNames = [];
        filteredNames.push(name);
      } else if (topValue === wordsMap.get(name)) {
        filteredNames.push(name);
      }
    });
    return filteredNames;
  }
}
