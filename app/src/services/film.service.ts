import { Injectable } from "@nestjs/common";
import { Film } from "@app/entities/film/film.entity";
import { FilmRepository } from "@app/repositories/film.repository";
import { FilmServiceIntrface } from "@app/common/types/interfaces/services/film.service.interface";
import { BaseAbstractService } from "@app/common/service/base.abstract.service";

@Injectable()
export class FilmService extends BaseAbstractService<Film> implements FilmServiceIntrface {
  constructor(filmsRepository: FilmRepository) {
    super(filmsRepository);
  }
}
