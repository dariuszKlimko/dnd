import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import { faker } from "@faker-js/faker";
import { FilmServiceIntrface } from "@app/common/types/interfaces/services/film.service.interface";
import { FilmService } from "@app/services/film.service";

describe("FilmService", () => {
  let filmService: FilmServiceIntrface;
  let configService: ConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmService],
    }).compile();

    filmService = module.get<FilmServiceIntrface>(FilmService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it("filmService should be defined", () => {
    expect(filmService).toBeDefined();
  });
});
