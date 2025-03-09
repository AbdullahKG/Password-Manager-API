import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface JwtPayLoad {
  sub: number;
  username: string;
}

interface User {
  userid: number;
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  userid: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<AuthResponse> {
    const user = await this.userService.getUser(username);

    if (!(await this.comparePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return this.generateToken(user);
  }

  async signup(userDto: createUserDto): Promise<AuthResponse> {
    const newUser = await this.userService.createUser(userDto);

    return this.generateToken(newUser);
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async generateToken(user: User): Promise<AuthResponse> {
    const payload: JwtPayLoad = { sub: user.userid, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken, userid: user.userid, username: user.username };
  }
}
