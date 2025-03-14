import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  sitePassword: string;
}
