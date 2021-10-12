import CreateUser from './dtos/createUser.dto';
import UpdateUser from './dtos/updateUser.dto';
import User from './user.interface';

export default interface UserService {
  findAllUsers: () => Promise<User[] | []>;
  findUser: (id: string) => Promise<User | string>;
  createUser: (user: CreateUser) => Promise<User | string>;
  updateUser: (user: UpdateUser) => Promise<User | false>;
  removeUser: (name: string) => Promise<boolean>;
}
