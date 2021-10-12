import CustomError from '../../utils/customError';
import { operationStatus } from '../../utils/httpCodes';
import CreateUser from '../interfaces/dtos/createUser.dto';
import FindAllUsers from '../interfaces/dtos/findAllUsers.dto';
import UpdateUser from '../interfaces/dtos/updateUser.dto';
import UserRepository from '../interfaces/userRepository.interface';
import IUserService from '../interfaces/userService.interface';

export default class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async findAllUsers(params?: FindAllUsers) {
    try {
      const users = await this.userRepository.findAllUsers(params);
      return users;
    } catch (err) {
      throw new CustomError(
        'An unknown error occurred',
        operationStatus.SERVER_ERROR,
      );
    }
  }

  async findUser(id: string) {
    try {
      const user = await this.userRepository.findOneUser(id);
      return user;
    } catch (err) {
      if (String(err) === 'Error: User not found') {
        throw new CustomError('User not found', operationStatus.NOT_FOUND);
      }
      throw new CustomError(
        'An unknown error occurred',
        operationStatus.SERVER_ERROR,
      );
    }
  }

  async createUser(user: CreateUser) {
    const { name, age, city } = user;
    if (!name || !age || !city) {
      throw new CustomError('Missing params', operationStatus.BAD_REQUEST);
    }
    try {
      const userCreated = await this.userRepository.createUser(user);
      return userCreated;
    } catch (err) {
      if (String(err) === 'Error: User already exists') {
        throw new CustomError(
          'User already exists',
          operationStatus.BAD_REQUEST,
        );
      }
      throw new CustomError(
        'An unknown error occurred',
        operationStatus.SERVER_ERROR,
      );
    }
  }

  async updateUser(user: UpdateUser) {
    const { name, age, city } = user;
    if (!name && !age && !city) {
      throw new CustomError('Missing params', operationStatus.BAD_REQUEST);
    }

    try {
      const userUpdated = await this.userRepository.updateUser(user);
      return userUpdated;
    } catch (err) {
      if (String(err) === 'Error: User not found') {
        throw new CustomError('User not found', operationStatus.NOT_FOUND);
      }
      throw new CustomError(
        'An unknown error occurred',
        operationStatus.SERVER_ERROR,
      );
    }
  }

  async removeUser(id: string) {
    if (!id) {
      throw new CustomError('Missing params', operationStatus.BAD_REQUEST);
    }

    try {
      const userRemoved = await this.userRepository.removeUser(id);
      return userRemoved;
    } catch (err) {
      if (String(err) === 'Error: User not found') {
        throw new CustomError('User not found', operationStatus.NOT_FOUND);
      }

      throw new CustomError(
        'An unknown error occurred',
        operationStatus.SERVER_ERROR,
      );
    }
  }
}
