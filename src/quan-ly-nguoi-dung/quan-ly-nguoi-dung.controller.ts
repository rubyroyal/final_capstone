import {
  Controller,
  Delete,
  Get,
  Headers,
  Query,
  Res,
  UseGuards,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { QuanLyNguoiDungService } from './quan-ly-nguoi-dung.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { updateUserDto, userDto } from './dto/user.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
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

  @Post('ThongTinTaiKhoan')
  postAccountInfo(
    @Headers('Authorization') token: string,
    @Res() res: Response,
  ) {
    return this.quanLyNguoiDungService.postAccountInfo(token, res);
  }

  @Post('LayThongTinNguoiDung')
  getUserInfoByAccount(
    @Query('taiKhoan') account: string,
    @Res() res: Response,
  ) {
    return this.quanLyNguoiDungService.getUserInfoByAccount(
      Number(account),
      res,
    );
  }

  @Post('ThemNguoiDung')
  createAccount(
    @Body() bodyUser: userDto,
    @Headers('Authorization') token: string,
    @Res() res: Response,
  ) {
    return this.quanLyNguoiDungService.createAccount(bodyUser, token, res);
  }

  @Put('CapNhatThongTinNguoiDung')
  updatePersonalInfo(
    @Query('taiKhoan') account: string,
    @Body() bodyUser: updateUserDto,
    @Headers('Authorization') token: string,
    @Res() res: Response,
  ) {
    return this.quanLyNguoiDungService.updatePersonalInfo(
      Number(account),
      bodyUser,
      token,
      res,
    );
  }

  @Post('CapNhatThongTinNguoiDung')
  updateUserInfoByRole(
    @Query('taiKhoan') account: string,
    @Body() bodyUser: updateUserDto,
    @Headers('Authorization') token: string,
    @Res() res: Response,
  ) {
    return this.quanLyNguoiDungService.updateUserInfoByRole(
      Number(account),
      bodyUser,
      token,
      res,
    );
  }

  @Delete('XoaNguoiDung')
  deleteUser(
    @Query('taiKhoan') account: string,
    @Headers('Authorization') token: string,
    @Res() res: Response,
  ) {
    return this.quanLyNguoiDungService.deleteUser(Number(account), token, res);
  }
}
