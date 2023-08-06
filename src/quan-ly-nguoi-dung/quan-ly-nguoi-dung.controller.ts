import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuanLyNguoiDungService } from './quan-ly-nguoi-dung.service';
import { CreateQuanLyNguoiDungDto } from './dto/create-quan-ly-nguoi-dung.dto';
import { UpdateQuanLyNguoiDungDto } from './dto/update-quan-ly-nguoi-dung.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("QuanLyNguoiDung")
@Controller('quan-ly-nguoi-dung')
export class QuanLyNguoiDungController {
  constructor(private readonly quanLyNguoiDungService: QuanLyNguoiDungService) {}

  @Post()
  create(@Body() createQuanLyNguoiDungDto: CreateQuanLyNguoiDungDto) {
    return this.quanLyNguoiDungService.create(createQuanLyNguoiDungDto);
  }

  @Get()
  findAll() {
    return this.quanLyNguoiDungService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quanLyNguoiDungService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuanLyNguoiDungDto: UpdateQuanLyNguoiDungDto) {
    return this.quanLyNguoiDungService.update(+id, updateQuanLyNguoiDungDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quanLyNguoiDungService.remove(+id);
  }
}
