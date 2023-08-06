import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { loginDto } from './dto/auth.dto';
import { Response } from 'express';
import { userDto } from 'src/quan-ly-nguoi-dung/dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() body: userDto, @Res() res: Response) {
    return this.authService.signUp(body, res);
  }

  @Post('login')
  login(@Body() body: loginDto, @Res() res: Response) {
    return this.authService.login(body, res);
  };

}
