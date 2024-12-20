import { MigrationInterface, QueryRunner } from "typeorm";

export class Planet1734730146783 implements MigrationInterface {
    name = 'Planet1734730146783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "planets" ("_id" character varying(32) NOT NULL, "description" text NOT NULL, "uid" text NOT NULL, "__v" integer NOT NULL, CONSTRAINT "PK_072b0f2354285ac7148098b85cb" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "planets_properties" ("_id" character varying(32) NOT NULL, "url" text NOT NULL, "created" character varying(32) NOT NULL, "edited" character varying(32) NOT NULL, "climate" text NOT NULL, "diameter" text NOT NULL, "films" text array NOT NULL DEFAULT '{}', "gravity" text NOT NULL, "name" text NOT NULL, "orbital_period" text NOT NULL, "population" text NOT NULL, "residents" text array NOT NULL DEFAULT '{}', "rotation_period" text NOT NULL, "surface_water" text NOT NULL, "terrain" text NOT NULL, "planet_id" character varying(32), CONSTRAINT "REL_a5aaf0181d832f38b5e44c01bd" UNIQUE ("planet_id"), CONSTRAINT "PK_0c9c3a987bdcc08205d74f1500d" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`ALTER TABLE "planets_properties" ADD CONSTRAINT "FK_a5aaf0181d832f38b5e44c01bd5" FOREIGN KEY ("planet_id") REFERENCES "planets"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "planets_properties" DROP CONSTRAINT "FK_a5aaf0181d832f38b5e44c01bd5"`);
        await queryRunner.query(`DROP TABLE "planets_properties"`);
        await queryRunner.query(`DROP TABLE "planets"`);
    }

}
