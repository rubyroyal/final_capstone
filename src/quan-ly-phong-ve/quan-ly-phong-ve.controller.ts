import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuanLyPhongVeService } from './quan-ly-phong-ve.service';
import { CreateQuanLyPhongVeDto } from './dto/create-quan-ly-phong-ve.dto';
import { UpdateQuanLyPhongVeDto } from './dto/update-quan-ly-phong-ve.dto';

@Controller('quan-ly-phong-ve')
export class QuanLyPhongVeController {
  constructor(private readonly quanLyPhongVeService: QuanLyPhongVeService) {}

  @Post()
  create(@Body() createQuanLyPhongVeDto: CreateQuanLyPhongVeDto) {
    return this.quanLyPhongVeService.create(createQuanLyPhongVeDto);
  }

  @Get()
  findAll() {
    return this.quanLyPhongVeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quanLyPhongVeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuanLyPhongVeDto: UpdateQuanLyPhongVeDto) {
    return this.quanLyPhongVeService.update(+id, updateQuanLyPhongVeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quanLyPhongVeService.remove(+id);
  }
}
