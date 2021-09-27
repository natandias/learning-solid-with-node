import User from './user.interface';
import CreateUser from './dtos/createUser.dto';
import UpdateUser from './dtos/updateUser.dto';

export default interface UserRepository {
  findAll: () => User[] | [];
  findOne: (id: string) => User | string;
  create: (user: CreateUser) => boolean;
  update: (user: UpdateUser) => User | false;
  remove: (id: string) => boolean;
}
