import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/guard/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Login with username and password' })
  @ApiBody({ type: loginDto })
  @ApiOkResponse({
    description: 'User successfully logged in',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  login(@Body() body: loginDto) {
    return this.authService.login(body);
  }
  @Get('test')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token') // Shows "Authorize" button for JWT
  @ApiOperation({ summary: 'Protected test route to verify JWT' })
  @ApiOkResponse({ description: 'Returns a test response if JWT is valid' })
  test(@Req() req: any) {
    return {
      message: 'You are authenticated!',
      user: req.users, // Decoded JWT payload
    };
  }
}
