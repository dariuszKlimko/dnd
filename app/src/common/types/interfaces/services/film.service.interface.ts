import { BaseInterfaceService } from "@app/common/service/base.interface.service";
import { Film } from "@app/entities/film/film.entity";

export interface FilmServiceIntrface extends BaseInterfaceService<Film> {}
