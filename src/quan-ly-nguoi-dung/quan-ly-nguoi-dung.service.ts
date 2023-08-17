import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, tbl_NguoiDung } from '@prisma/client';
import { Response } from 'express';
import { Roles } from 'src/roles/roles.enum';
import { userDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class QuanLyNguoiDungService {
  constructor(private jwtService: JwtService) {}

  prisma = new PrismaClient();

  //   Lấy danh sách loại người dùng
  async getUserListType(res: Response) {
    try {
      const data = await this.prisma.tbl_LoaiNguoiDung.findMany();

      if (data) {
        res.status(200).json({
          status: '200',
          message: 'Lấy dữu liệu thành công.',
          data,
        });
      } else {
        res.status(404).json({
          status: '404',
          message: 'Không tìm thấy dữu liệu !!!',
        });
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  // Lấy danh sách người dùng
  async getUserList(res: Response) {
    try {
      const data = await this.prisma.tbl_NguoiDung.findMany();
      if (data) {
        res.status(200).json({
          status: '200',
          message: 'Lấy dữu liệu thành công.',
          data,
        });
      } else {
        res.status(404).json({
          status: '404',
          message: 'Không tìm thấy dữu liệu !!!',
        });
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  //   Lấy danh sách người dùng phân trang
  async getPaginatedUserList(
    pageNumber: number,
    pageSize: number,
    res: Response,
  ) {
    try {
      const index = (pageNumber - 1) * pageSize;

      const data = await this.prisma.tbl_NguoiDung.findMany({
        orderBy: { tai_khoan: 'desc' },
        take: pageSize,
        skip: index,
      });

      if (data) {
        res.status(200).json({
          status: '200',
          message: 'Lấy dữu liệu thành công.',
          data,
        });
      } else {
        res.status(404).json({
          status: '404',
          message: 'Không tìm thấy dữu liệu !!!',
        });
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  //   Tìm kiếm người dùng
  async getSearchUsers(keyWord: string, res: Response) {
    try {
      const data = await this.prisma.tbl_NguoiDung.findMany({
        where: {
          ho_ten: {
            contains: `%${keyWord}%`,
          },
        },
      });

      if (data) {
        res.status(200).json({
          status: '200',
          message: 'Lấy dữu liệu thành công.',
          data,
        });
      } else {
        res.status(404).json({
          status: '404',
          message: 'Không tìm thấy dữu liệu !!!',
        });
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  //   Tìm kiếm người dùng phân trang
  async getPaginatedSearchUsers(
    pageNumber: number,
    pageSize: number,
    keyWord: string,
    res: Response,
  ) {
    try {
      const index = (pageNumber - 1) * pageSize;

      const data = await this.prisma.tbl_NguoiDung.findMany({
        orderBy: { tai_khoan: 'desc' },
        take: pageSize,
        skip: index,
        where: {
          ho_ten: {
            contains: `%${keyWord}%`,
          },
        },
      });

      if (data) {
        res.status(200).json({
          status: '200',
          message: 'Lấy dữu liệu thành công.',
          data,
        });
      } else {
        res.status(404).json({
          status: '404',
          message: 'Không tìm thấy dữu liệu !!!',
        });
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  //   Thông tin người dùng
  // async postAccountInfo(token: string, res: Response) {
  //   try {
  //     let payload: tbl_NguoiDung | any = this.jwtService.decode(
  //       token.split(" ")[1],
  //     );

  //     const data = await this.prisma.tbl_NguoiDung.findFirst({
  //       where: {
  //         tai_khoan: payload.tai_khoan,
  //       },
  //     });

  //     return res.status(200).json({
  //       status: '200',
  //       message: 'Lấy dữu liệu thành công.',
  //       data
  //     });
  //   } catch (error) {
  //     throw new HttpException(error.response, error.status);
  //   }
  // }

  // Lấy thông tin người dùng

  // Thêm người dùng
  async createAccount(bodyUser: userDto, token: string, res: Response) {
    try {
      let payload: tbl_NguoiDung | any = await this.jwtService.decode(
        token.split(' ')[1],
      );

      const checkAccountExist = await this.prisma.tbl_NguoiDung.findFirst({
        where: {
          tai_khoan: bodyUser.tai_khoan,
        },
      });

      const checkEmailExist = await this.prisma.tbl_NguoiDung.findFirst({
        where: {
          email: bodyUser.email,
        },
      });

      if (payload.ma_loai_nguoi_dung === Roles.ADMIN) {
        if (checkAccountExist) {
          return res.status(400).json({
            status: '400',
            message: 'Tài khoản này đã tồn tại !!!',
          });
        } else if (checkEmailExist) {
          return res.status(400).json({
            status: '400',
            message: 'Email này đã tồn tại !!!',
          });
        } else {
          const createdata = await this.prisma.tbl_NguoiDung.create({
            data: {
              tai_khoan: Number(bodyUser.tai_khoan),
              ho_ten: bodyUser.ho_ten,
              email: bodyUser.email,
              so_dt: bodyUser.so_dt,
              mat_khau: bcrypt.hashSync(bodyUser.mat_khau, 10),
              ma_loai_nguoi_dung: bodyUser.ma_loai_nguoi_dung,
            },
          });

          return res.status(200).json({
            status: '200',
            message: 'Tạo tài khoản thành công.',
            createdata,
          });
        }
      } else {
        res.status(403).json({
          status: '403',
          message: 'Bạn không có quyền hạn ở tài nguyên này !!!',
        });
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  // Cập nhật thông tin người dùng

  //   Xóa người dùng
  async deleteUser(account: number, token: string, res: Response) {
    try {
      let payload: tbl_NguoiDung | any = this.jwtService.decode(
        token.split(' ')[1],
      );

      const checkUserExist = await this.prisma.tbl_NguoiDung.findFirst({
        where: {
          tai_khoan: account,
        },
      });

      if (payload.ma_loai_nguoi_dung === Roles.ADMIN) {
        if (checkUserExist) {
          const data = await this.prisma.tbl_NguoiDung.delete({
            where: {
              tai_khoan: account,
            },
          });

          res.status(200).json({
            status: '200',
            message: 'Xóa tài khoản thành công.',
            data,
          });
        } else {
          res.status(404).json({
            status: '404',
            message: 'Không tìm thấy dữu liệu !!!',
          });
        }
      } else {
        res.status(403).json({
          status: '403',
          message: 'Bạn không có quyền hạn ở tài nguyên này !!!',
        });
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
