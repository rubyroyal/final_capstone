import { Module } from '@nestjs/common';
import { QuanLyPhongVeService } from './quan-ly-phong-ve.service';
import { QuanLyPhongVeController } from './quan-ly-phong-ve.controller';

@Module({
  controllers: [QuanLyPhongVeController],
  providers: [QuanLyPhongVeService]
})
export class QuanLyPhongVeModule {}
