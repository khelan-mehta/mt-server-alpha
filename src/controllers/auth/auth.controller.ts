import { Controller, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  '466091079940-bhglgc0ggj1de0nu9uccc1ecf2u8no16.apps.googleusercontent.com',
);

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body, @Res() res: Response) {
    console.log('hit');
    const { email, password } = body;
    try {
      const user = await this.authService.register(email, password);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    const { email, password } = body;
    console.log(email);
    console.log(password);

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
    const tokens = await this.authService.login(user);
    res.cookie('access_token', tokens.accessToken, { httpOnly: true });
    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
    return res.json(tokens).status(201);
  }

  @Post('google')
  async googleLogin(@Body() body, @Res() res: Response) {
    const { token } = body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        '466091079940-bhglgc0ggj1de0nu9uccc1ecf2u8no16.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    const googleId = payload['sub'];
    const email = payload['email'];
    const user = await this.authService.googleLogin(googleId, email);
    const tokens = await this.authService.login(user);
    res.cookie('access_token', tokens.accessToken, { httpOnly: true });
    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
    return res.json(tokens);
  }
  @Post('refresh')
  async refreshToken(@Body() body, @Res() res: Response) {
    const { token } = body;
    try {
      const newTokens = await this.authService.refreshToken(token);
      res.cookie('access_token', newTokens.accessToken, { httpOnly: true });
      return res.json(newTokens);
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid token' });
    }
  }
}
