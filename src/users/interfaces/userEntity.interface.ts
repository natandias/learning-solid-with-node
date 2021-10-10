import CreateUser from './dtos/createUser.dto';
import User from './user.interface';

export default interface UserEntity {
  id: string;
  name: string;
  age: number;
  city: string;
  create: (user: CreateUser) => User;
  get: () => User;
}
