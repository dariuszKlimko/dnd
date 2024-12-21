import { MigrationInterface, QueryRunner } from "typeorm";

export class Starship1734726069115 implements MigrationInterface {
  name = "Starship1734726069115";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "starships" ("_id" character varying(32) NOT NULL, "description" text NOT NULL, "uid" text NOT NULL, "__v" integer NOT NULL, CONSTRAINT "PK_35360e7df2e2556d3764ee7984e" PRIMARY KEY ("_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "starships_properties" ("_id" character varying(32) NOT NULL, "url" text NOT NULL, "created" character varying(32) NOT NULL, "edited" character varying(32) NOT NULL, "MGLT" text NOT NULL, "cargo_capacity" text NOT NULL, "consumables" text NOT NULL, "cost_in_credits" text NOT NULL, "crew" text NOT NULL, "hyperdriveRating" text NOT NULL, "length" text NOT NULL, "manufacturer" text NOT NULL, "max_a+tmosphering_speed" text NOT NULL, "model" text NOT NULL, "name" text NOT NULL, "passengers" text NOT NULL, "films" text array NOT NULL DEFAULT '{}', "pilots" text array NOT NULL DEFAULT '{}', "starship_class" text NOT NULL, "starship_id" character varying(32), CONSTRAINT "REL_ae580e780e1cd9c119bdab0cbd" UNIQUE ("starship_id"), CONSTRAINT "PK_956991cf3d28e96f07ec6544792" PRIMARY KEY ("_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "starships_properties" ADD CONSTRAINT "FK_ae580e780e1cd9c119bdab0cbd2" FOREIGN KEY ("starship_id") REFERENCES "starships"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "starships_properties" DROP CONSTRAINT "FK_ae580e780e1cd9c119bdab0cbd2"`);
    await queryRunner.query(`DROP TABLE "starships_properties"`);
    await queryRunner.query(`DROP TABLE "starships"`);
  }
}
