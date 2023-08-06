import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuanLyNguoiDungService } from './quan-ly-nguoi-dung.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("QuanLyNguoiDung")
@Controller('quan-ly-nguoi-dung')
export class QuanLyNguoiDungController {
  constructor(private readonly quanLyNguoiDungService: QuanLyNguoiDungService) {}

}
