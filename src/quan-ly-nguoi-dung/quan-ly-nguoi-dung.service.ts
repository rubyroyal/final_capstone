import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class QuanLyNguoiDungService {
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
        res.status(400).json({
          status: '400',
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
        res.status(400).json({
          status: '400',
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
        res.status(400).json({
          status: '400',
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
        res.status(400).json({
          status: '400',
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
        res.status(400).json({
          status: '400',
          message: 'Không tìm thấy dữu liệu !!!',
        });
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
