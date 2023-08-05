import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuanLyPhimModule } from './quan-ly-phim/quan-ly-phim.module';
import { QuanLyRapModule } from './quan-ly-rap/quan-ly-rap.module';
import { QuanLyPhongVeModule } from './quan-ly-phong-ve/quan-ly-phong-ve.module';
import { QuanLyDatVeModule } from './quan-ly-dat-ve/quan-ly-dat-ve.module';
import { QuanLyNguoiDungModule } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.module';

@Module({
  imports: [QuanLyPhimModule, QuanLyRapModule, QuanLyPhongVeModule, QuanLyDatVeModule, QuanLyNguoiDungModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
