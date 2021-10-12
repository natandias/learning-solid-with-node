import UserEntity from '../entities/userInMemory.local.entity';
import User from '../interfaces/user.interface';
import UserRepository from '../interfaces/userRepository.interface';
import CreateUser from '../interfaces/dtos/createUser.dto';
import UpdateUser from '../interfaces/dtos/updateUser.dto';
import FindAllUsers from '../interfaces/dtos/findAllUsers.dto';

export default class UserInMemoryRepository implements UserRepository {
  constructor(private userEntity: UserEntity) {}

  private usersList: User[] = [];

  findAllUsers(params?: FindAllUsers) {
    return new Promise<User[]>(resolve => {
      let items: User[] = [];
      if (params) {
        const availableParams = {
          id: 1,
          name: 2,
          age: 3,
          city: 4,
          createdAt: 5,
          updatedAt: 6,
          deletedAt: 7,
        };
        const keysOfParams = Object.keys(params) as Array<
          keyof typeof availableParams
        >;
        items = this.usersList.filter(item => {
          if (
            keysOfParams.filter(key => item[key] === params[key]).length > 0 &&
            !item.deletedAt
          ) {
            return true;
          }
          return false;
        });
      } else items = this.usersList.filter(item => !item.deletedAt);
      resolve(items);
    });
  }

  findOneUser(id: string) {
    return new Promise<'User not found' | User>(resolve => {
      const userFound = this.usersList.find(
        user => user.id === id && !user.deletedAt,
      );
      if (userFound) {
        resolve(userFound);
      } else {
        resolve('User not found');
      }
    });
  }

  createUser({ name, age, city }: CreateUser) {
    return new Promise<string | User>(resolve => {
      if (!name || !age || !city) resolve('Missing params');

      this.findAllUsers({ name }).then(userExists => {
        if (userExists.length > 0) {
          resolve('User already exists');
        } else {
          const user = this.userEntity.create({
            name,
            age,
            city,
          });
          this.usersList.push(user);
          resolve(user);
        }
      });
    });
  }

  async updateUser({ id, ...otherValues }: UpdateUser) {
    const user = await this.findOneUser(id);

    return new Promise<false | User>(resolve => {
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
      if (user === 'User not found') resolve(false);
      this.usersList = this.usersList.map(item =>
        item.id === id ? { ...item, deletedAt: new Date() } : item,
      );
      resolve(true);
    });
  }
}
