import { Injectable } from '@nestjs/common';
import { CreateQuanLyNguoiDungDto } from './dto/create-quan-ly-nguoi-dung.dto';
import { UpdateQuanLyNguoiDungDto } from './dto/update-quan-ly-nguoi-dung.dto';

@Injectable()
export class QuanLyNguoiDungService {
  create(createQuanLyNguoiDungDto: CreateQuanLyNguoiDungDto) {
    return 'This action adds a new quanLyNguoiDung';
  }

  findAll() {
    return `This action returns all quanLyNguoiDung`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quanLyNguoiDung`;
  }

  update(id: number, updateQuanLyNguoiDungDto: UpdateQuanLyNguoiDungDto) {
    return `This action updates a #${id} quanLyNguoiDung`;
  }

  remove(id: number) {
    return `This action removes a #${id} quanLyNguoiDung`;
  }
}
