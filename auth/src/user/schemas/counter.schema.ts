import { Schema } from 'mongoose';

export const CounterSchema = new Schema({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
