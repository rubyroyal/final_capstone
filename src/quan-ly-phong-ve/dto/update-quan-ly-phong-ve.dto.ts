import { PartialType } from '@nestjs/mapped-types';
import { CreateQuanLyPhongVeDto } from './create-quan-ly-phong-ve.dto';

export class UpdateQuanLyPhongVeDto extends PartialType(CreateQuanLyPhongVeDto) {}
