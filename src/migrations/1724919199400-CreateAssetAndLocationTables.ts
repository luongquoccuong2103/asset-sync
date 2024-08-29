import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssetAndLocationTables1688284934157
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS location (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                status VARCHAR(255) NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS asset (
                id SERIAL PRIMARY KEY,
                type VARCHAR(255) NOT NULL,
                serial VARCHAR(255) NOT NULL,
                status VARCHAR(255) NOT NULL,
                description TEXT,
                createdAt TIMESTAMP NOT NULL,
                updatedAt TIMESTAMP NOT NULL,
                deletedAt TIMESTAMP,
                locationId INT,
                CONSTRAINT FK_location FOREIGN KEY (locationId) REFERENCES location(id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS asset;`);
    await queryRunner.query(`DROP TABLE IF EXISTS location;`);
  }
}
