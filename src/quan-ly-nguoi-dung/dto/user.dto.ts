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

