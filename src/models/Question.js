/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const questionSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  question: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Question = model('Question', questionSchema);
export default Question;
