import CreateUser from '../interfaces/dtos/createUser.dto';
import UpdateUser from '../interfaces/dtos/updateUser.dto';
import UserRepository from '../interfaces/userRepository.interface';
import IUserService from '../interfaces/userService.interface';

export default class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async findAllUsers() {
    const users = this.userRepository.findAllUsers();
    return users;
  }

  async findUser(id: string) {
    const user = this.userRepository.findOneUser(id);
    return user;
  }

  async createUser(user: CreateUser) {
    const { name, age, city } = user;
    if (!name || !age || !city) return false;
    const userCreated = await this.userRepository.createUser(user);
    return userCreated;
  }

  async updateUser(user: UpdateUser) {
    const { name, age, city } = user;
    if (!name && !age && !city) return false;
    const userUpdated = await this.userRepository.updateUser(user);
    return userUpdated;
  }

  async removeUser(id: string) {
    if (!id) return false;
    const userRemoved = await this.userRepository.removeUser(id);
    return userRemoved;
  }
}
