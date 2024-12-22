import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpStatus, ValidationPipe } from "@nestjs/common";
import { AppModule } from "@app/app.module";
import loadFixtures, { FixtureFactoryInterface } from "@test/helpers/load.fixtures";
import { FilmRepository } from "@app/repositories/film.repository";
import { getCRUD } from "@test/helpers/crud";
import { FilmRepositoryInterface } from "@app/common/types/interfaces/repositories/film.repository.interface";
import { DataSource } from "typeorm";

describe("Films (e2e)", () => {
  let app: INestApplication;
  let fixtures: FixtureFactoryInterface;
  let fimlRepository: FilmRepositoryInterface;
  let dataSource: DataSource;

  beforeEach(async () => {
    fixtures = await loadFixtures();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    fimlRepository = moduleFixture.get<FilmRepositoryInterface>(FilmRepository);
    dataSource = moduleFixture.get<DataSource>(DataSource);

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("filmRepository should be defined", () => {
    expect(fimlRepository).toBeDefined();
  });
  it("dataSource should be defined", () => {
    expect(dataSource).toBeDefined();
  });

  describe("/films (GET) - get all films", () => {
    it("should get all films", async () => {
      return await getCRUD("/films", null, app).then((res) => {
        expect(res.status).toEqual(HttpStatus.OK);
        expect(res.body[0].length).toEqual(3);
      });
    });

    it("should get films with pagination", async () => {
      return await getCRUD("/films?skip=1&take=2", null, app).then((res) => {
        expect(res.status).toEqual(HttpStatus.OK);
        expect(res.body[0].length).toEqual(2);
      });
    });

    it("should get films with filter", async () => {
      return await getCRUD("/films?title=Elo", null, app).then((res) => {
        expect(res.status).toEqual(HttpStatus.OK);
        expect(res.body[0].length).toEqual(1);
      });
    });
  });

  describe("/films/:uid (GET) - get one film", () => {
    it("should get one film with existed uid", async () => {
      return await getCRUD(`/films/${fixtures.get("film1").uid}`, null, app).then((res) => {
        expect(res.status).toEqual(HttpStatus.OK);
        expect(res.body.uid).toEqual(fixtures.get("film1").uid);
      });
    });

    it("should not get film with wrong uid", async () => {
      return await getCRUD("/films/9", null, app).then((res) => {
        expect(res.status).toEqual(HttpStatus.NOT_FOUND);
      });
    });
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });
});
