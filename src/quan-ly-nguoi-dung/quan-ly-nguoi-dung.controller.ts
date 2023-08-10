import { Controller, Get, Query, Res } from '@nestjs/common';
import { QuanLyNguoiDungService } from './quan-ly-nguoi-dung.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('QuanLyNguoiDung')
@Controller('quan-ly-nguoi-dung')
export class QuanLyNguoiDungController {
  constructor(
    private readonly quanLyNguoiDungService: QuanLyNguoiDungService,
  ) {}

  @Get('LayDanhSachLoaiNguoiDung')
  getUserListType(@Res() res: Response) {
    return this.quanLyNguoiDungService.getUserListType(res);
  }

  @Get('LayDanhSachNguoiDung')
  getUserList(@Res() res: Response) {
    return this.quanLyNguoiDungService.getUserList(res);
  }

  @Get('LayDanhSachNguoiDungPhanTrang')
  getPaginatedUserList(
    @Query('soTrang') pageNumber: string,
    @Query('soPhanTuTrenTrang') pageSize: string,
    @Res() res: Response,
  ) {
    return this.quanLyNguoiDungService.getPaginatedUserList(
      Number(pageNumber),
      Number(pageSize),
      res,
    );
  }

  @Get('TimKiemNguoiDung')
  getSearchUsers(@Query('tuKhoa') keyWord: string, @Res() res: Response) {
    return this.quanLyNguoiDungService.getSearchUsers(keyWord, res);
  }

  @Get('TimKiemNguoiDungPhanTrang')
  getPaginatedSearchUsers(
    @Query('soTrang') pageNumber: string,
    @Query('soPhanTuTrenTrang') pageSize: string,
    @Query('tuKhoa') keyWord: string,
    @Res() res: Response,
  ) {
    return this.quanLyNguoiDungService.getPaginatedSearchUsers(
      Number(pageNumber),
      Number(pageSize),
      keyWord,
      res,
    );
  }
}
