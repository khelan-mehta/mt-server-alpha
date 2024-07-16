import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule from @nestjs/axios
import { OrderController } from './controllers/orders/order.controller';
import OrderModel from './database/models/order.model';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { LoggerService } from './services/logger.service';
import { UploadService } from './services/upload.service';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://Khelan05:KrxRwjRwkhgYUdwh@cluster0.c6y9phd.mongodb.net/?retryWrites=true&w=majority'),
        MongooseModule.forFeature([{ name: 'Order', schema: OrderModel.schema }]),
        HttpModule, // Ensure HttpModule is imported correctly
    ],
    controllers: [OrderController, AppController],
    providers: [
        UploadService,
        AppService,
        LoggerService,
    ],
})
export class AppModule {}
