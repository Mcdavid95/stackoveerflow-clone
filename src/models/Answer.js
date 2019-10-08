/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const answerSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  answer: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
answerSchema.index({
  answer: 'text'
});
const Answer = model('Answer', answerSchema);
export default Answer;
