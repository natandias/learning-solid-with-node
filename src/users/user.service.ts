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
    const { name, age, city } = user;
    if (!name || !age || !city) return false;
    return this.userRepository.create(user);
  }

  updateUser(user: UpdateUser) {
    const { name, age, city } = user;
    if (!name && !age && !city) return false;
    return this.userRepository.update(user);
  }

  removeUser(id: string) {
    if (!id) return false;
    return this.userRepository.remove(id);
  }
}
