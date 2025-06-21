import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  Patch,
  Param,
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

  @Get(':siteName')
  async getSpecificPassword(
    @Req() req: userRerquest,
    @Param('siteName') siteName: string,
  ) {
    return await this.passwordService.getSpecificPassword(
      req.users.userid,
      siteName,
    );
  }

  @Post()
  async createPassword(
    @Body() passwordDto: createPasswordDto,
    @Req() req: userRerquest,
  ) {
    return await this.passwordService.createPassword(
      passwordDto,
      req.users.userid,
    );
  }

  @Delete(':siteName/:siteEmail')
  async deletePassword(
    @Req() req: userRerquest,
    @Param('siteName') siteName: string,
    @Param('siteEmail') siteEmail: string,
  ) {
    return await this.passwordService.deletePassword(
      req.users.userid,
      siteName,
      siteEmail,
    );
  }

  @Patch()
  async updatePassword(
    @Req() req: userRerquest,
    @Body('siteName') siteName: string,
    @Body('newPassword') newPassword: string,
    @Body('siteEmail') siteEmail: string,
  ) {
    return await this.passwordService.updatePassword(
      req.users.userid,
      siteName,
      newPassword,
      siteEmail,
    );
  }
}
