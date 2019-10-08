/* eslint-disable import/no-cycle */
/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import dotenv from 'dotenv';
import { hashPassword } from '../utils/authHelpers';

dotenv.config();

const userSchema = new Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  password: { type: String, required: true },
  email: {
    type: String, trim: true, unique: true, required: true
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

userSchema.pre('save', async function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  const hash = await hashPassword(user.password);

  // override the cleartext password with the hashed one
  user.password = hash;
  next();
});
userSchema.index({
  firstName: 'text',
  lastName: 'text',
  email: 'text'
});

const User = model('User', userSchema);
export default User;
