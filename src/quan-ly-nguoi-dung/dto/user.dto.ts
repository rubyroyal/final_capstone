import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
  @ApiProperty()
  tai_khoan: number;

  @ApiProperty()
  ho_ten: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  so_dt: string;

  @ApiProperty()
  mat_khau: string;
}

export class updateUserDto {
  @ApiProperty()
  ho_ten: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  so_dt: string;

  @ApiProperty()
  mat_khau: string;

  @ApiProperty()
  ma_loai_nguoi_dung: string;
}

export class userDto {
  @ApiProperty()
  tai_khoan: number;

  @ApiProperty()
  ho_ten: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  so_dt: string;

  @ApiProperty()
  mat_khau: string;

  @ApiProperty()
  ma_loai_nguoi_dung: string;
}

export class thongTinDatVeDto {
  ten_phim: string;
  hinh_anh: string;
  gia_ve: number;

  danhSachGhe: Array<danhSachGheDto>;
}

export class danhSachGheDto {
  ma_he_thong_rap: number;
  ten_he_thong_rap: string;
  ma_cum_rap: number;
  ten_cum_rap: string;
  ma_rap: number;
  ten_rap: string;
  ma_ghe: number;
  ten_ghe: string;
}
