import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class createPasswordDto {
  @IsNumber()
  @IsNotEmpty({ message: 'user id is required' })
  userid: number;

  @IsString({ message: 'site should be provided' })
  @IsNotEmpty()
  siteName: string;

  @IsNotEmpty()
  @IsEmail()
  siteEmail: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'password should be more than or eqaul to 8 characters',
  })
  sitePassword: string;
}
