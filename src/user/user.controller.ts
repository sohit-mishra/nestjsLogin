import {
  Body,
  Controller,
  Post,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: { email: string; password: string }) {
    return await this.userService.login(user.email, user.password);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signup(createUserDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Headers('authorization') authorization: string) {
    return await this.userService.refreshToken(authorization);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return await this.userService.logout();
  }
}
