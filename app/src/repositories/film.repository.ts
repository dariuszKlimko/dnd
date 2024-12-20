import { BaseAbstractRepository } from "@app/common/repository/base.abstract.repository";
import { Film } from "@app/entities/film/film.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FilmRepositoryInterface } from "@app/common/types/interfaces/repositories/film.repository.interface";
import { FILM_NOT_FOUND } from "@app/common/constans/constans";

export class FilmRepository extends BaseAbstractRepository<Film> implements FilmRepositoryInterface {
  constructor(@InjectRepository(Film) filmRepository: Repository<Film>) {
    super(filmRepository, FILM_NOT_FOUND);
  }
}
