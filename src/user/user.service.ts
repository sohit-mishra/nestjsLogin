import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRATION = '1h';
  private readonly JWT_REFRESH_SECRET: string;
  private readonly JWT_REFRESH_EXPIRATION = '7d';

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
    this.JWT_SECRET = this.configService.get<string>('SECRET_KEY');
    this.JWT_REFRESH_SECRET =
      this.configService.get<string>('JWT_REFRESH_SECRET');
  }

  async signup(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new HttpException('Email is already taken', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hashedPassword });
    await user.save();

    const accessToken = this.generateAccessToken(user.email);
    const refreshToken = this.generateRefreshToken(user.email);

    return { accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = this.generateAccessToken(user.email);
    const refreshToken = this.generateRefreshToken(user.email);

    return { accessToken, refreshToken };
  }

  private generateAccessToken(email: string): string {
    return jwt.sign({ email }, this.configService.get<string>('JWT_SECRET'), {
      expiresIn: this.JWT_EXPIRATION,
    });
  }

  private generateRefreshToken(email: string): string {
    return jwt.sign(
      { email },
      this.configService.get<string>('JWT_REFRESH_SECRET'),
      {
        expiresIn: this.JWT_REFRESH_EXPIRATION,
      },
    );
  }

  async refreshToken(authorization: string) {
    if (!authorization) {
      throw new HttpException(
        'No authorization header found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const refreshToken = authorization.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(refreshToken, this.JWT_REFRESH_SECRET) as {
        email: string;
      };
      const accessToken = this.generateAccessToken(decoded.email);
      return { accessToken };
    } catch {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout() {
    return { message: 'Successfully logged out' };
  }
}
