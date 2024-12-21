import { MigrationInterface, QueryRunner } from "typeorm";

export class ToSnakeCase1734823950968 implements MigrationInterface {
  name = "ToSnakeCase1734823950968";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "starships_properties" DROP COLUMN "hyperdriveRating"`);
    await queryRunner.query(`ALTER TABLE "starships_properties" DROP COLUMN "max_a+tmosphering_speed"`);
    await queryRunner.query(`ALTER TABLE "starships_properties" ADD "hyperdrive_rating" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "starships_properties" ADD "max_atmosphering_speed" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "starships_properties" DROP COLUMN "max_atmosphering_speed"`);
    await queryRunner.query(`ALTER TABLE "starships_properties" DROP COLUMN "hyperdrive_rating"`);
    await queryRunner.query(`ALTER TABLE "starships_properties" ADD "max_a+tmosphering_speed" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "starships_properties" ADD "hyperdriveRating" text NOT NULL`);
  }
}
