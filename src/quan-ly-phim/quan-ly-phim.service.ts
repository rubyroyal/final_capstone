import { Injectable } from '@nestjs/common';
import { CreateQuanLyPhimDto } from './dto/create-quan-ly-phim.dto';
import { UpdateQuanLyPhimDto } from './dto/update-quan-ly-phim.dto';

@Injectable()
export class QuanLyPhimService {
  create(createQuanLyPhimDto: CreateQuanLyPhimDto) {
    return 'This action adds a new quanLyPhim';
  }

  findAll() {
    return `This action returns all quanLyPhim`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quanLyPhim`;
  }

  update(id: number, updateQuanLyPhimDto: UpdateQuanLyPhimDto) {
    return `This action updates a #${id} quanLyPhim`;
  }

  remove(id: number) {
    return `This action removes a #${id} quanLyPhim`;
  }
}
