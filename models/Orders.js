import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cartList: [],

  orderTime: {
    timestamps: true,
  },
});

export default mongoose.model('Order', OrderSchema, 'orders');
