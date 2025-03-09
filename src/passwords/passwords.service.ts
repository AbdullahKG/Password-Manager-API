import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NumericType, Repository } from 'typeorm';
import { Passwords } from './passwords.entity';
import { createPasswordDto } from './dtos/create-password.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PasswordsService {
  constructor(
    @InjectRepository(Passwords)
    private readonly passwordRepository: Repository<Passwords>,
    private readonly userService: UsersService,
  ) {}

  async getUserPasswords(userid: number): Promise<Passwords[]> {
    const password = await this.passwordRepository.find({
      where: { user: { userid: userid } },
    });

    if (password.length === 0) {
      throw new NotFoundException(
        'there is no passwords for this user at the moment',
      );
    }

    return password;
  }

  async createPassword(passwordDto: createPasswordDto): Promise<Passwords> {
    // check if there is a user before
    const user = await this.userService.getUserById(passwordDto.userid); // the check is in user service

    // check if site email is already used for the same site
    const check = await this.isSiteEmailUsedForSameSite(passwordDto);

    if (check) {
      throw new ConflictException('the email is already used for this site');
    }

    // if everything ok create new
    const newPassword = this.passwordRepository.create({
      siteName: passwordDto.siteName,
      siteEmail: passwordDto.siteEmail,
      sitePassword: passwordDto.sitePassword,
      user: { userid: user.userid },
    });

    return await this.passwordRepository.save(newPassword);
  }

  async deletePassword(
    userid: number,
    siteName: string,
  ): Promise<{
    message: string;
    statusCode: number;
  }> {
    const deletePassword = await this.passwordRepository.delete({
      user: { userid: userid },
      siteName,
    });

    if (deletePassword.affected === 0) {
      throw new NotFoundException(
        'there is no password to deleted for the specified site',
      );
    }

    return {
      message: 'password deleted successfully for the specified site',
      statusCode: 200,
    };
  }

  private async isSiteEmailUsedForSameSite(
    passwordDto: createPasswordDto,
  ): Promise<boolean> {
    const check = await this.passwordRepository.findOne({
      select: { siteName: true },
      where: {
        siteEmail: passwordDto.siteEmail,
        siteName: passwordDto.siteName,
      },
    });

    return check ? true : false;
  }
}
