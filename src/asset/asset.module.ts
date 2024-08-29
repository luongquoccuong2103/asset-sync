import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { Asset } from './entities/asset.entity';
import { Location } from './entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, Location])],
  providers: [AssetService],
  controllers: [AssetController],
})
export class AssetModule {}
