import { Schema, Types } from 'mongoose';

const OrderSchema = new Schema({
    orderName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Types.ObjectId, required: true, ref: 'User' },
    desc: { type: String },
    imgUrl: [{ type: String }], // Keep this if you want to support URLs
    audioFileUrl: { type: String, required: true },
    worker: { type: Types.ObjectId, required: true, ref: 'Worker' },
    workerRate: { type: Number, required: true },
    designCode: { type: String, required: true },
    trackingCode: { type: String },
    measurements: { type: Map, of: Number, required: true },
    deleted: { type: Boolean, default: false },
    price: { type: Number, required: true } // Add the price field
});

export default OrderSchema;
