import { Repository } from 'typeorm';
import User from './user.interface';
import CreateUser from './dtos/createUser.dto';
import UpdateUser from './dtos/updateUser.dto';
import UserEntity from '../entities/user.entity';
import FindAllUsers from './dtos/findAllUsers.dto';

export default interface UserRepository
  extends Partial<Repository<UserEntity>> {
  findAllUsers: (params?: FindAllUsers) => Promise<User[]>;
  findOneUser: (id: string) => Promise<User | 'User not found'>;
  createUser: (user: CreateUser) => Promise<User | string>;
  updateUser: (user: UpdateUser) => Promise<User | false>;
  removeUser: (id: string) => Promise<boolean>;
}
