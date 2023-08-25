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

  //   Thông tin tài khoản (cần xem lại)
  async postAccountInfo(token: string, res: Response) {
    // try {

    let payload: tbl_NguoiDung | any = this.jwtService.decode(
      token.split(' ')[1],
    );

    // if(payload.ma_loai_nguoi_dung === Roles.ADMIN) {
    // const content = this.prisma.tbl_NguoiDung.findUnique({
    //   where: {
    //     tai_khoan: payload.tai_khoan
    //   },
    //   include: {
    //     tbl_LoaiNguoiDung: true,
    //     tbl_DatVe: {
    //       include: {
    //         tbl_LichChieu: {
    //           include: {
    //             tbl_Phim: true
    //             // {
    //             //   select: {
    //             //     ten_phim: true,
    //             //     hinh_anh: true
    //             //   }
    //             // }
    //           },
    //           select: {
    //             gia_ve: true
    //           }
    //         }
    //       }
    //     }
    //   }
    // });

    // console.log(content);

    const content = await this.prisma.tbl_NguoiDung.findUnique({
      where: {
        tai_khoan: payload.tai_khoan,
      },
      include: {
        tbl_LoaiNguoiDung: true,

        tbl_DatVe: {
          include: {
            tbl_LichChieu: {
              include: {
                tbl_Phim: {
                  select: {
                    ten_phim: true,
                    hinh_anh: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      status: '200',
      message: 'Lấy dữ liệu thành công.',
      content,
    });

    // } else {
    //   res.status(403).json({
    //     status: '403',
    //     message: 'Bạn không có quyền hạn ở tài nguyên này !!!',
    //   });
    // }

    // const thongTinDatVe = thongTinDatVeDto[];
    // const danhSachGhe = danhSachGheDto[""];

    // const [userInfo, thongTinDatVe, danhSachGhe]: [userDto, thongTinDatVeDto[], danhSachGheDto[]] = await Promise.all([
    //   this.prisma.tbl_NguoiDung.findFirst({
    //     where: {
    //       tai_khoan: payload.tai_khoan
    //     },
    //     include: {
    //       tbl_LoaiNguoiDung: true
    //     }
    //   }),

    //   this.prisma.tbl_DatVe.findMany({
    //     where: {
    //       tai_khoan: payload.tai_khoan
    //     },
    //     include: {
    //       tbl_LichChieu:{
    //         include: {
    //           tbl_Phim: {
    //             select: {
    //               ten_phim: true,
    //               hinh_anh: true,
    //             }
    //           }
    //         },
    //         select: {
    //           gia_ve: true
    //         }
    //       }
    //     }
    //   })
    // ])

    // const data = await this.prisma.tbl_NguoiDung.findFirst({
    //   where: {
    //     tai_khoan: payload.tai_khoan,
    //   },
    //   include: {
    //     tbl_DatVe:{

    //     },

    //     tbl_LoaiNguoiDung: true,
    //   },
    // });

    // const ticket = await this.prisma.tbl_DatVe.findFirst({
    //   where: {
    //     tai_khoan: payload.tai_khoan,
    //   },
    //   include: {
    //     tbl_LichChieu: {
    //       include: {
    //         tbl_Phim: true,
    //       },
    //     },
    //   },
    // });

    // const danhSachGhe = [];

    // if (ticket) {
    // const thongTinDatVe = [
    //   // ten_phim: ticket.tbl_LichChieu.tbl_Phim.ten_phim,
    //   // hinh_anh: ticket.tbl_LichChieu.tbl_Phim.hinh_anh,
    //   // gia_ve: ticket.tbl_LichChieu.gia_ve,
    // ];

    // // Tạo danh sách ghế
    // const danhSachGheItem = await Promise.all(
    //   danhSachGhe.map(async (maGhe) => {
    //     // Tìm kiếm ghế trong cơ sở dữ liệu theo mã ghế
    //     const seat = await this.prisma.tbl_Ghe.findUnique({
    //       where: {
    //         ma_ghe: maGhe,
    //       },
    //       include: {
    //         tbl_RapPhim: {
    //           include: {
    //             tbl_CumRap: {
    //               include: {
    //                 tbl_HeThongRap: true,
    //               },
    //             },
    //           },
    //         },
    //       },
    //     });
    //   }),
    // );

    // const user = await this.prisma.tbl_NguoiDung.update({
    //   where: {
    //     tai_khoan: payload.tai_khoan,
    //   },
    //   data: {
    //     tbl_DatVe: {
    //       create: {
    //         ...thongTinDatVe,
    //         danhSachGhe: {
    //           createMany: {
    //             data: danhSachGhe,
    //           },
    //         },
    //       },
    //     },
    //   },
    //   include: {
    //     tbl_LoaiNguoiDung: true,
    //     tbl_DatVe: true,
    //   },
    // });
    // }

    // return res.status(200).json({
    //   status: '200',
    //   message: 'Lấy dữu liệu thành công.',
    //   user,
    // });
    // }

    // if (data) {
    //   return res.status(200).json({
    //     status: '200',
    //     message: 'Lấy dữu liệu thành công.',
    //     data,
    //   });
    // } else {
    //   return res.status(404).json({
    //     status: '404',
    //     message: 'Dữ liệu không tồn tại !!!',
    //   });
    // }
    // } catch (error) {
    //   throw new HttpException(error.response, error.status);
    // }
  }

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

      // Kiểm tra xem người dùng này đã có đặt vé hay chưa?
      const checkAccountHasTicket = await this.prisma.tbl_DatVe.findFirst({
        where: {
          tai_khoan: account,
        },
      });

      let data: any;

      if (payload.ma_loai_nguoi_dung === Roles.ADMIN) {
        if (checkUserExist) {
          if (checkAccountHasTicket) {
            data = await this.prisma.tbl_DatVe.deleteMany({
              where: {
                tai_khoan: account,
              },
            });
          }

          data = await this.prisma.tbl_NguoiDung.delete({
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
