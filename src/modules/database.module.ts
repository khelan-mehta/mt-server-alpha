import { Module } from '@nestjs/common';
import { databaseProviders } from '../services/database.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
