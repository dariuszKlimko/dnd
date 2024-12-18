import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1734472180322 implements MigrationInterface {
  name = "Initial1734472180322";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "film_properties" ("_id" character varying(32) NOT NULL, "url" text NOT NULL, "created" character varying(32) NOT NULL, "edited" character varying(32) NOT NULL, "characters" text array NOT NULL DEFAULT '{}', "planets" text array NOT NULL DEFAULT '{}', "starships" text array NOT NULL DEFAULT '{}', "vehicles" text array NOT NULL DEFAULT '{}', "species" text array NOT NULL DEFAULT '{}', "producer" text NOT NULL, "title" text NOT NULL, "episode_id" integer NOT NULL, "director" text NOT NULL, "release_date" character varying(32) NOT NULL, "opening_crawl" text NOT NULL, "film_id" character varying(32), CONSTRAINT "REL_9c6c6a2a05a840c23af12028ed" UNIQUE ("film_id"), CONSTRAINT "PK_ee5fad54091ea31c3867512e4e9" PRIMARY KEY ("_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "films" ("_id" character varying(32) NOT NULL, "description" text NOT NULL, "uid" text NOT NULL, "__v" integer NOT NULL, CONSTRAINT "PK_80c43701a35cb69d3db95ec74c2" PRIMARY KEY ("_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "film_properties" ADD CONSTRAINT "FK_9c6c6a2a05a840c23af12028ed1" FOREIGN KEY ("film_id") REFERENCES "films"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "film_properties" DROP CONSTRAINT "FK_9c6c6a2a05a840c23af12028ed1"`);
    await queryRunner.query(`DROP TABLE "films"`);
    await queryRunner.query(`DROP TABLE "film_properties"`);
  }
}
