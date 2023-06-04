import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

UserSchema.pre('save', async function (next) {
  const user: any = this;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
