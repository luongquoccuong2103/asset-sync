import { DataSource } from 'typeorm';
import { Asset } from './asset/entities/asset.entity';
import { Location } from './asset/entities/location.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'assetdb',
  entities: [Asset, Location],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
