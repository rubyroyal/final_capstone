import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuanLyDatVeService } from './quan-ly-dat-ve.service';
import { CreateQuanLyDatVeDto } from './dto/create-quan-ly-dat-ve.dto';
import { UpdateQuanLyDatVeDto } from './dto/update-quan-ly-dat-ve.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("QuanLyDatVe")
@Controller('quan-ly-dat-ve')
export class QuanLyDatVeController {
  constructor(private readonly quanLyDatVeService: QuanLyDatVeService) {}

  @Post()
  create(@Body() createQuanLyDatVeDto: CreateQuanLyDatVeDto) {
    return this.quanLyDatVeService.create(createQuanLyDatVeDto);
  }

  @Get()
  findAll() {
    return this.quanLyDatVeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quanLyDatVeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuanLyDatVeDto: UpdateQuanLyDatVeDto) {
    return this.quanLyDatVeService.update(+id, updateQuanLyDatVeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quanLyDatVeService.remove(+id);
  }
}
