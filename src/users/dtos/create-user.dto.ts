import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4, {
    message: 'username should be more than or equal to 4 characters',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'password should be more than or equal to 8 characters',
  })
  password: string;
}
