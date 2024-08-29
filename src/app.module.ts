import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetModule } from './asset/asset.module';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true,
    }),
    AssetModule,
  ],
})
export class AppModule {}
