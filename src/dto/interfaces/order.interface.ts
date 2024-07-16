import { Document, Types } from 'mongoose';

export interface Order extends Document {
    orderName: string;
    createdAt: Date;
    createdBy: Types.ObjectId;
    desc?: string;
    imgUrl: string[]; // Keep this if you want to support URLs
    audioFileUrl: string;
    worker: Types.ObjectId;
    workerRate: number;
    designCode: string;
    trackingCode?: string;
    measurements: Map<string, number>;
    deleted: boolean; // Include the 'deleted' field in the interface
    price: number; // Add the price field
}
