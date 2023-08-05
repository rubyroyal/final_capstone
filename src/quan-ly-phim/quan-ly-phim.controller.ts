import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuanLyPhimService } from './quan-ly-phim.service';
import { CreateQuanLyPhimDto } from './dto/create-quan-ly-phim.dto';
import { UpdateQuanLyPhimDto } from './dto/update-quan-ly-phim.dto';

@Controller('quan-ly-phim')
export class QuanLyPhimController {
  constructor(private readonly quanLyPhimService: QuanLyPhimService) {}

  @Post()
  create(@Body() createQuanLyPhimDto: CreateQuanLyPhimDto) {
    return this.quanLyPhimService.create(createQuanLyPhimDto);
  }

  @Get()
  findAll() {
    return this.quanLyPhimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quanLyPhimService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuanLyPhimDto: UpdateQuanLyPhimDto) {
    return this.quanLyPhimService.update(+id, updateQuanLyPhimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quanLyPhimService.remove(+id);
  }
}
