import { Module } from '@nestjs/common';
import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passwords } from './passwords.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Passwords]), UsersModule],
  controllers: [PasswordsController],
  providers: [PasswordsService],
})
export class PasswordsModule {}
