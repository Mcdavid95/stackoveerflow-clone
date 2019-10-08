/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const voteSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  vote: {
    type: String,
    enum: ['upvote', 'downvote', 'neutral'],
    default: 'nuetral'
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Vote = model('Vote', voteSchema);
export default Vote;
