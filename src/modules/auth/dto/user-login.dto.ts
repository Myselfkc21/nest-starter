import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class UserLoginDto {

  @IsString({message:i18nValidationMessage('validation.check')})
  @ApiProperty({example:"JD"})
  username: string;

    @IsString({message:i18nValidationMessage('validation.password.length')})
    @ApiProperty({example:"password123"})
  password: string;
}
