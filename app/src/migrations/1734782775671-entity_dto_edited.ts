import { MigrationInterface, QueryRunner } from "typeorm";

export class EntityDtoEdited1734782775671 implements MigrationInterface {
  name = "EntityDtoEdited1734782775671";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "uid"`);
    await queryRunner.query(`ALTER TABLE "vehicles" ADD "uid" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "starships" DROP COLUMN "uid"`);
    await queryRunner.query(`ALTER TABLE "starships" ADD "uid" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "uid"`);
    await queryRunner.query(`ALTER TABLE "species" ADD "uid" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "planets" DROP COLUMN "uid"`);
    await queryRunner.query(`ALTER TABLE "planets" ADD "uid" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "uid"`);
    await queryRunner.query(`ALTER TABLE "films" ADD "uid" SERIAL NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "uid"`);
    await queryRunner.query(`ALTER TABLE "films" ADD "uid" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "planets" DROP COLUMN "uid"`);
    await queryRunner.query(`ALTER TABLE "planets" ADD "uid" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "uid"`);
    await queryRunner.query(`ALTER TABLE "species" ADD "uid" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "starships" DROP COLUMN "uid"`);
    await queryRunner.query(`ALTER TABLE "starships" ADD "uid" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "uid"`);
    await queryRunner.query(`ALTER TABLE "vehicles" ADD "uid" text NOT NULL`);
  }
}
