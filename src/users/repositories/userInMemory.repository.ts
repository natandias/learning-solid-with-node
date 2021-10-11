import UserEntity from '../entities/userInMemory.local.entity';
import User from '../interfaces/user.interface';
import UserRepository from '../interfaces/userRepository.interface';
import CreateUser from '../interfaces/dtos/createUser.dto';
import UpdateUser from '../interfaces/dtos/updateUser.dto';

export default class UserInMemoryRepository implements UserRepository {
  constructor(private userEntity: UserEntity) {}

  private usersList: User[] = [];

  findAllUsers() {
    return new Promise<User[]>(resolve => resolve(this.usersList));
  }

  findOneUser(id: string) {
    return new Promise<string | User>(resolve => {
      const userFound = this.usersList.find(user => user.id === id);
      if (userFound) {
        resolve(userFound);
      } else {
        resolve('User not found');
      }
    });
  }

  createUser({ name, age, city }: CreateUser) {
    return new Promise<false | User>(resolve => {
      // eslint-disable-next-line prefer-promise-reject-errors
      if (!name || !age || !city) resolve(false);
      const user = this.userEntity.create({
        name,
        age,
        city,
      });
      this.usersList.push(user);
      resolve(user);
    });
  }

  async updateUser({ id, ...otherValues }: UpdateUser) {
    const user = await this.findOneUser(id);

    return new Promise<false | User>(resolve => {
      // eslint-disable-next-line prefer-promise-reject-errors
      if (user === 'User not found') resolve(false);
      this.usersList = this.usersList.map(item =>
        item.id === id ? { ...item, ...otherValues } : item,
      );
      const updatedUser = this.usersList.find(userm => userm.id === id)!;
      resolve(updatedUser);
    });
  }

  async removeUser(id: string) {
    const user = await this.findOneUser(id);

    return new Promise<boolean>(resolve => {
      // eslint-disable-next-line prefer-promise-reject-errors
      if (user === 'User not found') resolve(false);
      this.usersList = this.usersList.filter(item => item.id !== id);
      resolve(true);
    });
  }
}
