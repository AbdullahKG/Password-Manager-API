import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { createPasswordDto } from './dtos/create-password.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { userRerquest } from 'src/passwords/interfaces/user-request.interface';

@Controller('passwords')
@UseGuards(AuthGuard)
export class PasswordsController {
  constructor(private readonly passwordService: PasswordsService) {}

  @Get()
  async getAllPasswords(@Req() req: userRerquest) {
    return await this.passwordService.getUserPasswords(req.users.userid);
  }

  @Post()
  async createPassword(@Body() passwordDto: createPasswordDto) {
    return await this.passwordService.createPassword(passwordDto);
  }

  @Delete()
  async deletePassword(
    @Req() req: userRerquest,
    @Body('siteName') siteName: string,
  ) {
    return await this.passwordService.deletePassword(
      req.users.userid,
      siteName,
    );
  }

  @Patch()
  async upadatePassword(
    @Req() req: userRerquest,
    @Body('siteName') siteName: string,
    @Body('newPassword') newPassword: string,
  ) {
    return await this.passwordService.updatePassword(
      req.users.userid,
      siteName,
      newPassword,
    );
  }
}
