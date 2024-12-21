import { MigrationInterface, QueryRunner } from "typeorm";

export class Species1734692251728 implements MigrationInterface {
  name = "Species1734692251728";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "species" ("_id" character varying(32) NOT NULL, "description" text NOT NULL, "uid" text NOT NULL, "__v" integer NOT NULL, CONSTRAINT "PK_b3db1ddca80000de54e4c4d0bb0" PRIMARY KEY ("_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "species_properties" ("_id" character varying(32) NOT NULL, "url" text NOT NULL, "created" character varying(32) NOT NULL, "edited" character varying(32) NOT NULL, "average_height" text NOT NULL, "average_lifespan" text NOT NULL, "classification" text NOT NULL, "designation" text NOT NULL, "eye_colors" text NOT NULL DEFAULT 'none', "hair_colors" text NOT NULL DEFAULT 'none', "skin_colors" text NOT NULL DEFAULT 'none', "homeworld" text NOT NULL, "language" text NOT NULL, "name" text NOT NULL, "people" text array NOT NULL DEFAULT '{}', "films" text array NOT NULL DEFAULT '{}', "species_id" character varying(32), CONSTRAINT "REL_c951c3d95687cedd6abfbe60ae" UNIQUE ("species_id"), CONSTRAINT "PK_05d092fba4731cc4496223d95a1" PRIMARY KEY ("_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "species_properties" ADD CONSTRAINT "FK_c951c3d95687cedd6abfbe60ae9" FOREIGN KEY ("species_id") REFERENCES "species"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "species_properties" DROP CONSTRAINT "FK_c951c3d95687cedd6abfbe60ae9"`);
    await queryRunner.query(`DROP TABLE "species_properties"`);
    await queryRunner.query(`DROP TABLE "species"`);
  }
}
