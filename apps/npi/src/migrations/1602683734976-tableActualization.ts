import {MigrationInterface, QueryRunner} from "typeorm";

export class tableActualization1602683734976 implements MigrationInterface {
    name = 'tableActualization1602683734976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "taxonomy" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying, "license" character varying NOT NULL, "primary" boolean NOT NULL DEFAULT true, "state" character varying NOT NULL, "taxonomy_group" character varying, "providerId" integer, CONSTRAINT "PK_36dd19c538ef0f3d368a5ed1e09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "practice_location" ("id" SERIAL NOT NULL, "address_1" character varying NOT NULL, "address_2" character varying NOT NULL, "address_type" character varying NOT NULL, "city" character varying NOT NULL, "country_code" character varying NOT NULL, "country_name" character varying NOT NULL, "postal_code" character varying NOT NULL, "state" character varying NOT NULL, "telephone_number" character varying, "fax_number" character varying, "update_date" character varying NOT NULL, "providerId" integer, CONSTRAINT "PK_d2f7344ed8488de43f86778ea60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "other_name" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "credential" character varying, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "prefix" character varying, "type" character varying NOT NULL, "providerId" integer, CONSTRAINT "PK_2721c4a31e83fad3a0210eb8be1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "basic" ("id" SERIAL NOT NULL, "credential" character varying, "enumeration_date" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "gender" character varying, "last_updated" character varying NOT NULL, "middle_name" character varying, "name" character varying NOT NULL, "name_prefix" character varying, "sole_proprietor" character varying, "status" character varying NOT NULL, "providerId" integer, CONSTRAINT "REL_4baac30330c28cf6f9137504bd" UNIQUE ("providerId"), CONSTRAINT "PK_2e1e3b4c3c4ef3c74b61baddf15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "identifier" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "desc" character varying NOT NULL, "identifier" character varying NOT NULL, "issuer" character varying, "state" character varying, "providerId" integer, CONSTRAINT "PK_d3d2abb5833f4695e48610f5b6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "health_care_provider" ("id" SERIAL NOT NULL, "created_epoch" integer NOT NULL, "enumeration_type" character varying NOT NULL, "last_updated_epoch" integer NOT NULL, "num" character varying NOT NULL, CONSTRAINT "PK_e20b10eaf2709cd01be7a477345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "address_1" character varying NOT NULL, "address_2" character varying NOT NULL, "address_type" character varying NOT NULL, "city" character varying NOT NULL, "country_code" character varying NOT NULL, "country_name" character varying NOT NULL, "postal_code" character varying NOT NULL, "state" character varying NOT NULL, "telephone_number" character varying, "fax_number" character varying, "providerId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "taxonomy" ADD CONSTRAINT "FK_eb5a6f573dc0da90e8b91d62a1c" FOREIGN KEY ("providerId") REFERENCES "health_care_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "practice_location" ADD CONSTRAINT "FK_b4244a43b8f95aa31a61ed9f616" FOREIGN KEY ("providerId") REFERENCES "health_care_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "other_name" ADD CONSTRAINT "FK_febbc051b24ad29db3301ec279d" FOREIGN KEY ("providerId") REFERENCES "health_care_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basic" ADD CONSTRAINT "FK_4baac30330c28cf6f9137504bde" FOREIGN KEY ("providerId") REFERENCES "health_care_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "identifier" ADD CONSTRAINT "FK_103633f602264587ce5237b78a5" FOREIGN KEY ("providerId") REFERENCES "health_care_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_c0304246aaf83f8e2c7ddae4db5" FOREIGN KEY ("providerId") REFERENCES "health_care_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_c0304246aaf83f8e2c7ddae4db5"`);
        await queryRunner.query(`ALTER TABLE "identifier" DROP CONSTRAINT "FK_103633f602264587ce5237b78a5"`);
        await queryRunner.query(`ALTER TABLE "basic" DROP CONSTRAINT "FK_4baac30330c28cf6f9137504bde"`);
        await queryRunner.query(`ALTER TABLE "other_name" DROP CONSTRAINT "FK_febbc051b24ad29db3301ec279d"`);
        await queryRunner.query(`ALTER TABLE "practice_location" DROP CONSTRAINT "FK_b4244a43b8f95aa31a61ed9f616"`);
        await queryRunner.query(`ALTER TABLE "taxonomy" DROP CONSTRAINT "FK_eb5a6f573dc0da90e8b91d62a1c"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "health_care_provider"`);
        await queryRunner.query(`DROP TABLE "identifier"`);
        await queryRunner.query(`DROP TABLE "basic"`);
        await queryRunner.query(`DROP TABLE "other_name"`);
        await queryRunner.query(`DROP TABLE "practice_location"`);
        await queryRunner.query(`DROP TABLE "taxonomy"`);
    }

}
