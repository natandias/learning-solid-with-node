import UserEntity from '../entities/user.entity';
import User from '../interfaces/user.interface';
import UserRepository from '../interfaces/userRepository.interface';
import CreateUser from '../interfaces/dtos/createUser.dto';
import UpdateUser from '../interfaces/dtos/updateUser.dto';

export default class UserInMemoryRepository implements UserRepository {
  private usersList: User[] = [];

  private userEntity = new UserEntity();

  findAll() {
    return this.usersList;
  }

  findOne(id: string) {
    return this.usersList.find(user => user.id === id) || 'User not found';
  }

  create({ name, age, city }: CreateUser) {
    const user = this.userEntity.create({
      name,
      age,
      city,
    });

    if (!name || !age || !city) return false;

    this.usersList.push(user.get());

    return true;
  }

  update({ id, ...otherValues }: UpdateUser) {
    const userExists = this.findOne(id);
    if (userExists) {
      this.usersList = this.usersList.map(item =>
        item.id === id ? { ...item, ...otherValues } : item,
      );
      const updatedUser = this.usersList.find(user => user.id === id)!;
      return updatedUser;
    }
    return false;
  }

  remove(id: string) {
    const userExists = this.findOne(id);
    if (userExists) {
      this.usersList = this.usersList.filter(item => item.id !== id);
      return true;
    }
    return false;
  }
}
