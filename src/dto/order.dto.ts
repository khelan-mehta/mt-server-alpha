import { IsNotEmpty, IsString, IsDateString, IsArray, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  orderName: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsOptional()
  @IsArray()
  imgUrl: string[];

  @IsOptional()
  @IsString()
  audioFileUrl: string;

  @IsOptional()
  @IsString()
  worker: string;

  @IsOptional()
  @IsNumber()
  workerRate: number;

  @IsOptional()
  @IsString()
  designCode: string;

  @IsOptional()
  @IsString()
  trackingCode: string;

  @IsOptional()
  @IsArray()
  measurements: Map<string, number>;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean; // Soft delete flag, optional during creation

  @IsNotEmpty()
  @IsNumber()
  price: number; // Add the price field
}

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  orderName: string;

  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsString()
  createdBy: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsOptional()
  @IsArray()
  imgUrl: string[];

  @IsOptional()
  @IsString()
  audioFileUrl: string;

  @IsOptional()
  @IsString()
  worker: string;

  @IsOptional()
  @IsNumber()
  workerRate: number;

  @IsOptional()
  @IsString()
  designCode: string;

  @IsOptional()
  @IsString()
  trackingCode: string;

  @IsOptional()
  @IsArray()
  measurements: Map<string, number>;

  @IsOptional()
  @IsNumber()
  price: number; // Add the price field
}

export class CreateInvoiceDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  orderIds: string[];
}

export class CreateSlipDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;
}
