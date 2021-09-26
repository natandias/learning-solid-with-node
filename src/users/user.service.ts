import CreateUser from './interfaces/dtos/createUser.dto';
import UpdateUser from './interfaces/dtos/updateUser.dto';
import UserRepository from './interfaces/userRepository.interface';
import IUserService from './interfaces/userService.interface';

export default class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  findAllUsers() {
    return this.userRepository.findAll();
  }

  findUser(id: string) {
    return this.userRepository.findOne(id);
  }

  createUser(user: CreateUser) {
    return this.userRepository.create(user);
  }

  updateUser(user: UpdateUser) {
    return this.userRepository.update(user);
  }

  removeUser(id: string) {
    return this.userRepository.remove(id);
  }
}
