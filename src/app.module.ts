import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetModule } from './asset/asset.module';
import { Asset } from './asset/entities/asset.entity';
import { Location } from './asset/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'assetdb',
      synchronize: true,
      entities: [Asset, Location],
    }),
    AssetModule,
  ],
})
export class AppModule {}
