import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { loginDto } from './dto/auth.dto';
import { Response } from 'express';
import { createUserDto } from 'src/quan-ly-nguoi-dung/dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('DangKy')
  signUp(@Body() body: createUserDto, @Res() res: Response) {
    return this.authService.signUp(body, res);
  }

  @Post('DangNhap')
  login(@Body() body: loginDto, @Res() res: Response) {
    return this.authService.login(body, res);
  };

}
