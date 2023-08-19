import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, tbl_NguoiDung } from '@prisma/client';
import { Response } from 'express';
import { Roles } from 'src/roles/roles.enum';
import { updateUserDto, userDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class QuanLyNguoiDungService {
  constructor(private jwtService: JwtService) {}

  prisma = new PrismaClient();

  //   Lấy danh sách loại người dùng
  async getUserListType(res: Response) {
    try {
      const data = await this.prisma.tbl_LoaiNguoiDung.findMany();

      if (data.length > 0) {
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
      if (data.length > 0) {
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

      if (data.length > 0) {
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
      let data = await this.prisma.tbl_NguoiDung.findMany({
        where: {
          ho_ten: {
            contains: `%${keyWord}%`,
          },
        },
      });

      if (data.length > 0) {
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

      if (data.length > 0) {
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

  // //   Thông tin tài khoản (cần xem lại)
  // async postAccountInfo(token: string, res: Response) {
  //   try {
  //     let payload: tbl_NguoiDung | any = this.jwtService.decode(
  //       token.split(' ')[1],
  //     );

  //     const data = await this.prisma.tbl_NguoiDung.findFirst({
  //       where: {
  //         tai_khoan: payload.tai_khoan,
  //       },
  //       include: {
  //         tbl_LoaiNguoiDung: true,
  //       },
  //     });

  //     const data2 = await this.prisma.tbl_DatVe.findFirst({
  //       where: {
  //         tai_khoan: payload.tai_khoan,
  //       },
  //       include: {
  //         tbl_Ghe: true,
  //         tbl_LichChieu: true,
  //       },
  //     });

  //     const data3 = await this.prisma.tbl_LichChieu.findFirst({
  //       where: {
  //         ma_lich_chieu: data2.ma_lich_chieu,
  //       },
  //       include: {
  //         tbl_RapPhim: true,
  //       },
  //     });

  //     const data4 = await this.prisma.tbl_RapPhim.findFirst({
  //       where: {
  //         ma_rap: data3.ma_rap,
  //       },
  //       include: {
  //         tbl_CumRap: true,
  //       },
  //     });

  //     const data5 = await this.prisma.tbl_CumRap.findFirst({
  //       where: {
  //         ma_cum_rap: data4.ma_cum_rap,
  //       },
  //       include: {
  //         tbl_HeThongRap: true,
  //       },
  //     });


  //     const newData = {...data, ...data2, ...data3, ...data4, ...data5}

  //     console.log(newData);
      

  //     // if (data) {
  //     //   return res.status(200).json({
  //     //     status: '200',
  //     //     message: 'Lấy dữu liệu thành công.',
  //     //     data,
  //     //   });
  //     // } else {
  //     //   return res.status(404).json({
  //     //     status: '404',
  //     //     message: 'Dữ liệu không tồn tại !!!',
  //     //   });
  //     // }
  //   } catch (error) {
  //     throw new HttpException(error.response, error.status);
  //   }
  // }

  // Lấy thông tin người dùng
  async getUserInfoByAccount(account: number, res: Response) {
    try {
      const data = await this.prisma.tbl_NguoiDung.findFirst({
        where: {
          tai_khoan: account,
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

  // PUT: Cập nhật thông tin người dùng
  async updatePersonalInfo(
    account: number,
    bodyUser: updateUserDto,
    token: string,
    res: Response,
  ) {
    try {
      let payload: tbl_NguoiDung | any = await this.jwtService.decode(
        token.split(' ')[1],
      );

      const checkAccount = await this.prisma.tbl_NguoiDung.findFirst({
        where: {
          tai_khoan: payload.tai_khoan,
          email: payload.email,
        },
      });

      const isAccount = await this.prisma.tbl_NguoiDung.findFirst({
        where: {
          tai_khoan: account,
        },
      });

      if (checkAccount.tai_khoan !== isAccount.tai_khoan) {
        return res.status(403).json({
          status: '403',
          message: 'Bạn không có quyền thay đổi tài khoản người khác !!!',
        });
      } else {
        if (isAccount) {
          const updateData = await this.prisma.tbl_NguoiDung.update({
            where: {
              tai_khoan: account,
            },
            data: {
              ho_ten: bodyUser.ho_ten,
              so_dt: bodyUser.so_dt,
              mat_khau: bcrypt.hashSync(bodyUser.mat_khau, 10),
              ma_loai_nguoi_dung: bodyUser.ma_loai_nguoi_dung,
            },
          });

          res.status(200).json({
            status: '200',
            message: 'Cập nhật dữ liệu thành công.',
            updateData,
          });
        } else {
          res.status(404).json({
            status: '404',
            message: 'Không tìm thấy dữu liệu !!!',
          });
        }
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  // POST: Cập nhật thông tin người dùng
  async updateUserInfoByRole(
    account: number,
    bodyUser: updateUserDto,
    token: string,
    res: Response,
  ) {
    try {
      let payload: tbl_NguoiDung | any = await this.jwtService.decode(
        token.split(' ')[1],
      );

      const isAccount = await this.prisma.tbl_NguoiDung.findFirst({
        where: {
          tai_khoan: account,
        },
      });

      if (payload.ma_loai_nguoi_dung === Roles.ADMIN) {
        if (isAccount) {
          const updateData = await this.prisma.tbl_NguoiDung.update({
            where: {
              tai_khoan: account,
            },
            data: {
              ho_ten: bodyUser.ho_ten,
              so_dt: bodyUser.so_dt,
              email: bodyUser.email,
              mat_khau: bcrypt.hashSync(bodyUser.mat_khau, 10),
              ma_loai_nguoi_dung: bodyUser.ma_loai_nguoi_dung,
            },
          });

          res.status(200).json({
            status: '200',
            message: 'Cập nhật dữ liệu thành công.',
            updateData,
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
