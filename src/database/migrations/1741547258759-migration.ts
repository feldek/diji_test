import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741547258759 implements MigrationInterface {
  name = 'Migration1741547258759';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users"
       (
           "id"       uuid              NOT NULL DEFAULT uuid_generate_v4(),
           "username" character varying NOT NULL,
           "balance"  numeric(10, 2)    NOT NULL,
           CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions"
       (
           "id"     uuid           NOT NULL DEFAULT uuid_generate_v4(),
           "amount" numeric(10, 2) NOT NULL,
           "userId" uuid           NOT NULL,
           CONSTRAINT "PK_transaction_id" PRIMARY KEY ("id"),
           CONSTRAINT "FK_transaction_userId" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE
       )`,
    );
    await queryRunner.query(`ALTER TABLE "transactions"
        ADD CONSTRAINT "FK_d6703c8f1c01fde6ed20abb26eb" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    const userId = '5de1f995-bbdc-4d89-ae5c-370c9b21a7a0';

    await queryRunner.query(`
        INSERT INTO "users" ("id", "username", "balance")
        VALUES ('${userId}', 'test_user', 1000.00)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);

    await queryRunner.query(`DROP TABLE "transactions"`);
  }
}
