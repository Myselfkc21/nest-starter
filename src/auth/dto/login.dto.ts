import { IsAlphanumeric, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';

export class loginDto {
  @ApiProperty({
    description: 'Username of the user',
    minLength: 4,
    example: 'krishnachaitanya',
  })
  @IsString({ message: i18nValidationMessage('validation.username.isString') })
  @MinLength(1, {
    message: i18nValidationMessage('validation.username.minLength'),
  })
  username: string;

  @ApiProperty({
    description: 'Alphanumeric password with at least 8 characters',
    minLength: 8,
    example: 'pass1234',
  })
  @IsAlphanumeric()
  @MinLength(8)
  password: string;
}
