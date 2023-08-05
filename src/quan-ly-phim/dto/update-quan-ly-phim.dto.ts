import { PartialType } from '@nestjs/mapped-types';
import { CreateQuanLyPhimDto } from './create-quan-ly-phim.dto';

export class UpdateQuanLyPhimDto extends PartialType(CreateQuanLyPhimDto) {}
