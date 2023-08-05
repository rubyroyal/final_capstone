import { PartialType } from '@nestjs/mapped-types';
import { CreateQuanLyNguoiDungDto } from './create-quan-ly-nguoi-dung.dto';

export class UpdateQuanLyNguoiDungDto extends PartialType(CreateQuanLyNguoiDungDto) {}
