import mongoose from 'mongoose';
import OrderSchema from '../schemas/order.schema'; // Adjust the path as per your file structure

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;
