import { Injectable } from '@nestjs/common';
import { CreateQuanLyDatVeDto } from './dto/create-quan-ly-dat-ve.dto';
import { UpdateQuanLyDatVeDto } from './dto/update-quan-ly-dat-ve.dto';

@Injectable()
export class QuanLyDatVeService {
  create(createQuanLyDatVeDto: CreateQuanLyDatVeDto) {
    return 'This action adds a new quanLyDatVe';
  }

  findAll() {
    return `This action returns all quanLyDatVe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quanLyDatVe`;
  }

  update(id: number, updateQuanLyDatVeDto: UpdateQuanLyDatVeDto) {
    return `This action updates a #${id} quanLyDatVe`;
  }

  remove(id: number) {
    return `This action removes a #${id} quanLyDatVe`;
  }
}
