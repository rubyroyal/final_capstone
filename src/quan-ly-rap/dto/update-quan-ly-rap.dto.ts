import { PartialType } from '@nestjs/mapped-types';
import { CreateQuanLyRapDto } from './create-quan-ly-rap.dto';

export class UpdateQuanLyRapDto extends PartialType(CreateQuanLyRapDto) {}
