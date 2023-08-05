import { Module } from '@nestjs/common';
import { QuanLyNguoiDungService } from './quan-ly-nguoi-dung.service';
import { QuanLyNguoiDungController } from './quan-ly-nguoi-dung.controller';

@Module({
  controllers: [QuanLyNguoiDungController],
  providers: [QuanLyNguoiDungService]
})
export class QuanLyNguoiDungModule {}
