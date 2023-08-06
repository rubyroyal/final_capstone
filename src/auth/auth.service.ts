import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { loginDto } from './dto/auth.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { userDto } from 'src/quan-ly-nguoi-dung/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  prisma = new PrismaClient();

  // signUp
  async signUp(userSignUp: userDto, res: Response) {
    try {
      let checkEmailExist = await this.prisma.tbl_NguoiDung.findFirst({
        where: {
          email: userSignUp.email,
        },
      });

      let checkAccountExist = await this.prisma.tbl_NguoiDung.findFirst({
        where: {
          tai_khoan: userSignUp.tai_khoan,
        },
      });

      if (checkAccountExist) {
        return res.status(400).json({
          status: '400',
          message: 'Tài khoản này đã tồn tại !!!',
        });
      } 
      if (checkEmailExist) {
        return res.status(400).json({
          status: '400',
          message: 'Email này đã tồn tại !!!',
        });
      } else {
       const datam =  await this.prisma.tbl_NguoiDung.create({
          data: {
            tai_khoan: Number(userSignUp.tai_khoan),
            ho_ten: userSignUp.ho_ten,
            email: userSignUp.email,
            so_dt: userSignUp.so_dt,
            mat_khau: bcrypt.hashSync(userSignUp.mat_khau, 10),
            loai_nguoi_dung: userSignUp.loai_nguoi_dung,
          },
        });
      }
    } catch (error) {
      throw new HttpException(error.response, error.status); 
    }
  }

  // login
  async login(userLogin: loginDto, res: Response) {
    try {
      let checkUser = await this.prisma.tbl_NguoiDung.findFirst({
        where: {
          email: userLogin.email,
        },
      });

      if (checkUser) {
        if (
          bcrypt.compareSync(userLogin.mat_khau, checkUser.mat_khau) ||
          userLogin.mat_khau == checkUser.mat_khau
        ) {
          checkUser = { ...checkUser, mat_khau: '' };

          const token = await this.jwtService.signAsync(
            { tai_khoan: checkUser.tai_khoan },
            { secret: this.configService.get('KEY'), expiresIn: '1d' },
          );

          const data = { user: checkUser, token: token };
          return res.status(200).json({
            status: '200',
            message: 'Đăng nhập thành công.',
            data,
          });
        } else {
          return res.status(400).json({
            status: '400',
            message: 'Mật khẩu không hợp lệ !!!',
          });
        }
      } else {
        return res.status(400).json({
          status: '400',
          message: 'Email không hợp lệ !!!',
        });
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
