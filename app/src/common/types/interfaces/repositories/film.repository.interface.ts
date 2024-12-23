import { BaseInterfaceRepository } from "@app/common/repository/base.interface.repository";
import { Film } from "@app/entities/film/film.entity";

export interface FilmRepositoryInterface extends BaseInterfaceRepository<Film> {}
