import { Controller, Get } from '@nestjs/common';
import { AssetService } from './asset.service';
import { Asset } from './entities/asset.entity';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get('sync')
  sync() {
    return this.assetService.syncAssets();
  }

  @Get()
  findAll(): Promise<Asset[]> {
    return this.assetService.findAll();
  }
}
