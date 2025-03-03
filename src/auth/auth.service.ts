import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async login(username: string, password: string) {
    const user = await this.userService.getUser(username);

    if (!(await this.comparePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return user;
  }

  async signup(userDto: createUserDto) {
    const newUser = await this.userService.createUser(userDto);

    return newUser;
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
