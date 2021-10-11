import { Repository } from 'typeorm';
import User from './user.interface';
import CreateUser from './dtos/createUser.dto';
import UpdateUser from './dtos/updateUser.dto';

export default interface UserRepository extends Partial<Repository<User>> {
  findAllUsers: () => Promise<User[] | []>;
  findOneUser: (id: string) => Promise<User | string>;
  createUser: (user: CreateUser) => Promise<User | false>;
  updateUser: (user: UpdateUser) => Promise<User | false>;
  removeUser: (id: string) => Promise<boolean>;
}
