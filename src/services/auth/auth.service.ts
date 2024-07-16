import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserSchema } from '../../database/schemas/user.schema';
import { User } from '../../dto/interfaces/user.interface';

interface JwtPayload {
  email: string;
  sub: string;
}

@Injectable()
export class AuthService {
  private readonly refreshTokens: Map<string, string> = new Map();

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async register(email: string, password: string) {
    return new this.userModel({
      email,
      password: await bcrypt.hash(password, 10),
    }).save();
  }

  generateRefreshToken(userId: string): string {
    const payload = { userId };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async login(user: any) {
    const id = user._id;
    const payload: JwtPayload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken(user._id.toString());
    this.refreshTokens.set(user._id.toString(), refreshToken);
    return { accessToken, refreshToken, id };
  }

  async googleLogin(googleId: string, email: string) {
    let user = await this.userModel.findOne({ googleId });
    if (!user) {
      user = new this.userModel({ email, googleId });
      await user.save();
    }
    return user;
  }

  async refreshToken(oldToken: string) {
    try {
      const decoded = this.jwtService.verify(oldToken);
      const user = await this.userModel.findById(decoded.userId);
      if (!user) {
        throw new Error('Invalid token');
      }
      const newAccessToken = this.jwtService.sign({
        email: user.email,
        sub: user._id,
      });
      return { accessToken: newAccessToken };
    } catch (e) {
      throw new Error('Invalid token');
    }
  }
}
