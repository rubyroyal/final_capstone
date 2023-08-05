import { Injectable } from '@nestjs/common';
import { CreateQuanLyPhongVeDto } from './dto/create-quan-ly-phong-ve.dto';
import { UpdateQuanLyPhongVeDto } from './dto/update-quan-ly-phong-ve.dto';

@Injectable()
export class QuanLyPhongVeService {
  create(createQuanLyPhongVeDto: CreateQuanLyPhongVeDto) {
    return 'This action adds a new quanLyPhongVe';
  }

  findAll() {
    return `This action returns all quanLyPhongVe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quanLyPhongVe`;
  }

  update(id: number, updateQuanLyPhongVeDto: UpdateQuanLyPhongVeDto) {
    return `This action updates a #${id} quanLyPhongVe`;
  }

  remove(id: number) {
    return `This action removes a #${id} quanLyPhongVe`;
  }
}
