import { MigrationInterface, QueryRunner } from "typeorm";

export class Vehicle1734698787422 implements MigrationInterface {
  name = "Vehicle1734698787422";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vehicles" ("_id" character varying(32) NOT NULL, "description" text NOT NULL, "uid" text NOT NULL, "__v" integer NOT NULL, CONSTRAINT "PK_70169e14221a60ad20b70a84d58" PRIMARY KEY ("_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "vehicles_properties" ("_id" character varying(32) NOT NULL, "url" text NOT NULL, "created" character varying(32) NOT NULL, "edited" character varying(32) NOT NULL, "cargo_capacity" text NOT NULL, "consumables" text NOT NULL, "cost_in_credits" text NOT NULL, "crew" text NOT NULL, "length" text NOT NULL, "manufacturer" text NOT NULL, "max_atmosphering_speed" text NOT NULL, "model" text NOT NULL, "name" text NOT NULL, "passengers" text NOT NULL, "pilots" text array NOT NULL DEFAULT '{}', "films" text array NOT NULL DEFAULT '{}', "vehicle_class" text NOT NULL, "vehicle_id" character varying(32), CONSTRAINT "REL_6c44600fbe9a6e965ec027e72b" UNIQUE ("vehicle_id"), CONSTRAINT "PK_05a3e30ee3461bdfcc7cb264e58" PRIMARY KEY ("_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles_properties" ADD CONSTRAINT "FK_6c44600fbe9a6e965ec027e72b2" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vehicles_properties" DROP CONSTRAINT "FK_6c44600fbe9a6e965ec027e72b2"`);
    await queryRunner.query(`DROP TABLE "vehicles_properties"`);
    await queryRunner.query(`DROP TABLE "vehicles"`);
  }
}
