import { Module } from '@nestjs/common';

// Models
import { usersProviders } from '../services/user/users.provider';
import OrderModel from 'src/database/models/order.model';

import { DatabaseModule } from './database.module';

// Controllers
import { AuthController } from 'src/controllers/auth/auth.controller';
import { OrderController } from 'src/controllers/orders/order.controller';
import { AppController } from 'src/controllers/app.controller';

// Providers
import { AuthService } from 'src/services/auth/auth.service';
import { JwtService } from '../services/auth/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AppService } from 'src/services/app.service';

// Configs - Nest Settings
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [

    AuthController,
    AppController,
    OrderController,
  ],
  providers: [
    
    AuthService,
    AppService,
    JwtService,
    ...usersProviders,
    OrderModel,
  ],
})
export class UsersModule {}
