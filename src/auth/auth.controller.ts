import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { createUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.login(username, password);

    return user;
  }

  @Post('signup')
  async signup(@Body() userDto: createUserDto) {
    const newUser = await this.authService.signup(userDto);

    return newUser;
  }
}
