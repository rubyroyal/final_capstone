import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuanLyPhimModule } from './quan-ly-phim/quan-ly-phim.module';
import { QuanLyRapModule } from './quan-ly-rap/quan-ly-rap.module';
import { QuanLyPhongVeModule } from './quan-ly-phong-ve/quan-ly-phong-ve.module';
import { QuanLyDatVeModule } from './quan-ly-dat-ve/quan-ly-dat-ve.module';
import { QuanLyNguoiDungModule } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    QuanLyPhimModule,
    QuanLyRapModule,
    QuanLyPhongVeModule,
    QuanLyDatVeModule,
    QuanLyNguoiDungModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true })
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
