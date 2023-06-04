import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const user = new this.userModel({ name, email, password });
    await user.save();
    return user;
  }

  async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(
    userId: string,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<User> {
    const user = await this.userModel.findById(userId);
    Object.assign(user, updateUserDto);
    await user.save();
    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    await user.deleteOne();
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // Compare the provided password with the hashed password stored in the user model
    // Implement your password comparison logic here (e.g., using bcrypt.compare)
    // Return true if the passwords match, or false otherwise

    // Assuming you are using bcrypt for password hashing and comparison
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
