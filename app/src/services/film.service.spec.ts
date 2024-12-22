import { Test, TestingModule } from "@nestjs/testing";
import { FilmServiceIntrface } from "@app/common/types/interfaces/services/film.service.interface";
import { FilmService } from "@app/services/film.service";
import loadFixtures, { FixtureFactoryInterface } from "@test/helpers/load.fixtures";
import { AppModule } from "@app/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Film } from "@app/entities/film/film.entity";
import { EntityNotFound } from "@app/common/exceptions/entity.not.found.exception";

describe("FilmService", () => {
  let app: INestApplication;
  let fixtures: FixtureFactoryInterface;
  let filmService: FilmServiceIntrface;

  beforeAll(async () => {
    fixtures = await loadFixtures();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    filmService = moduleFixture.get<FilmServiceIntrface>(FilmService);

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("filmService should be defined", () => {
    expect(filmService).toBeDefined();
  });

  describe("findOneByConditionOrThrow()", () => {
    it("get one user", async () => {
      const uid = fixtures.get("film1").uid;
      const film: Film = await filmService.findOneByConditionOrThrow({ uid }, ["properties"]);
      expect(film.__v).toEqual(fixtures.get("film1").__v);
      expect(film.description).toEqual(fixtures.get("film1").description);
    });

    it("get one user", async () => {
      const uid = 100;
      return await expect(filmService.findOneByConditionOrThrow({ uid }, ["properties"])).rejects.toThrow(EntityNotFound);
    });
  });
  
  describe("findAllByCondition()", () => {
    it("get all films", async () => {
      const films: [Film[],number] = await filmService.findAllByCondition();
      expect(films[0].length).toEqual(films[1]);
    });

    it("get films with filter (title)", async () => {
      const title = fixtures.get("filmProperty3").title;
      let skip: number;
      let take: number;
      const films: [Film[],number] = await filmService.findAllByCondition(
        { properties: { title } },
        skip,
        take,
        ["properties"]
      );
      expect(films[0].length).toEqual(1);
      expect(films[0][0].properties.title).toEqual(title);
    });

    it("get empty array of films with not existing title", async () => {
      const title = "not existed title";
      let skip: number;
      let take: number;
      const films: [Film[],number] = await filmService.findAllByCondition(
        { properties: { title } },
        skip,
        take,
        ["properties"]
      );
      expect(films[0].length).toEqual(0);
    });

    it("get films with pagination", async () => {
      let title: string;
      const skip = 1;
      const take = 1;
      const films: [Film[],number] = await filmService.findAllByCondition(
        { properties: { title } },
        skip,
        take,
        ["properties"]
      );
      expect(films[0].length).toEqual(1);
    });
  });

});
