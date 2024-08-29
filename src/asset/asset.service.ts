import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
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
    private readonly dataSource: DataSource,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncAssets() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const assets = await this.fetchAssets();

      for (const asset of assets) {
        const location = await queryRunner.manager.findOne(Location, {
          where: { id: asset.location_id, status: 'actived' },
        });

        if (location && asset.created_at < Date.now()) {
          const existingAsset = await queryRunner.manager.findOne(Asset, {
            where: { id: asset.id },
          });

          if (!existingAsset) {
            await queryRunner.manager.save(Asset, {
              ...asset,
              createdAt: new Date(asset.created_at * 1000),
              updatedAt: new Date(asset.updated_at * 1000),
              location,
            });
          } else {
            console.log(`Asset ${asset.id} already exists.`);
          }
        }
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Error syncing assets:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async fetchAssets(): Promise<any[]> {
    try {
      const response = await axios.get(
        'https://669ce22d15704bb0e304842d.mockapi.io/assets',
      );

      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch assets. Status code: ${response.status}`,
        );
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching assets from API:', error.message);
      return [];
    }
  }

  async findAll(): Promise<Asset[]> {
    return this.assetRepository.find({ relations: ['location'] });
  }
}
