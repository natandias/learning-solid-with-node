import CreateUser from './dtos/createUser.dto';
import UpdateUser from './dtos/updateUser.dto';
import User from './user.interface';

export default interface UserService {
  findAllUsers: () => User[] | [];
  findUser: (id: string) => User | string;
  createUser: (user: CreateUser) => boolean;
  updateUser: (user: UpdateUser) => User | false;
  removeUser: (name: string) => boolean;
}
