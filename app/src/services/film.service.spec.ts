import { Test, TestingModule } from "@nestjs/testing";
import { GeneratorServiceIntrface } from "@app/common/types/interfaces/services/generator.service.interface";
import { GeneratorSevice } from "@app/services/generator.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RESET_PASSWORD_MESSAGE, VERIFICATION_EMAIL_MESSAGE } from "@app/common/constans/constans";
import { User } from "@app/entities/user.entity";
import { faker } from "@faker-js/faker";
import { JwtPayload } from "@app/common/types/type/jwt.payload";
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
