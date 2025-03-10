import { Controller, Get, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { createPasswordDto } from './dtos/create-password.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('passwords')
@UseGuards(AuthGuard)
export class PasswordsController {
  constructor(private readonly passwordService: PasswordsService) {}

  @Get()
  async getAllPasswords(@Body('userid') userid: number) {
    return await this.passwordService.getUserPasswords(userid);
  }

  @Post()
  async createPassword(@Body() passwordDto: createPasswordDto) {
    return await this.passwordService.createPassword(passwordDto);
  }

  @Delete()
  async deletePassword(
    @Body('userid') userid: number,
    @Body('siteName') siteName: string,
  ) {
    return await this.passwordService.deletePassword(userid, siteName);
  }
}
