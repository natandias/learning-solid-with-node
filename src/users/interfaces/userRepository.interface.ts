import { Repository } from 'typeorm';
import User from './user.interface';
import CreateUser from './dtos/createUser.dto';
import UpdateUser from './dtos/updateUser.dto';
export default interface UserRepository extends Partial<Repository<User>> {
  find: () => User[] | [];
  findOne: (id: string) => User | string;
  create: (user: CreateUser) => User | false;
  update: (user: UpdateUser) => User | false;
  remove: (id: string) => boolean;
}
