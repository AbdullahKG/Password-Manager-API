import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async getUser(username: string) {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      throw new NotFoundException('There is no user with that username');
    }

    return user;
  }

  async createUser(userDto: createUserDto) {
    // check if there is already a user
    const user = await this.userRepository.findOne({
      where: { username: userDto.username },
    });

    if (user) {
      throw new ConflictException('there is already a user with that username');
    }

    userDto.password = await this.hashPassword(userDto.password);

    // create new user if everything is correct
    let newUser = this.userRepository.create(userDto);
    return await this.userRepository.save(newUser);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const pass = await bcrypt.hash(password, salt);

    return pass;
  }
}
