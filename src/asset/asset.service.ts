import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { Location } from './entities/location.entity';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncAssets() {
    console.log('Sync assets start:');
    const assets = await this.fetchAssets();
    for (const asset of assets) {
      const location = await this.locationRepository.findOne({
        where: { id: asset.location_id, status: 'actived' },
      });
      if (location && asset.created_at < Date.now()) {
        const existingAsset = await this.assetRepository.findOne({
          where: { id: asset.id },
        });
        if (!existingAsset) {
          await this.assetRepository.save({
            ...asset,
            createdAt: new Date(asset.created_at * 1000),
            updatedAt: new Date(asset.updated_at * 1000),
            location,
          });
        }
      }
    }
    console.log('Sync assets end.');
  }

  async fetchAssets(): Promise<any[]> {
    const response = await axios.get(
      'https://669ce22d15704bb0e304842d.mockapi.io/assets',
    );

    return response.data;
  }

  async findAll(): Promise<Asset[]> {
    return await this.assetRepository.find();
  }
}
