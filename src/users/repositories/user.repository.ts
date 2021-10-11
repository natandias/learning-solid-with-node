import { EntityRepository, Repository } from 'typeorm';
import UserEntity from '../entities/user.entity';
import CreateUserDto from '../interfaces/dtos/createUser.dto';
import UpdateUserDto from '../interfaces/dtos/updateUser.dto';

@EntityRepository(UserEntity)
export default class UserRepository extends Repository<UserEntity> {
  async findAllUsers() {
    const users = await this.find({});
    return users;
  }

  async findOneUser(id: string) {
    const user = await this.findOne(id);
    return user || 'User not found';
  }

  async createUser({ name, age, city }: CreateUserDto) {
    const user = new UserEntity();

    user.name = name;
    user.age = String(age);

    user.city = city;
    await this.save(user);

    return user;
  }

  updateUser({ id, name, age, city }: UpdateUserDto) {
    return this.update(id, { name, age: String(age), city });
  }

  async removeUser(id: string) {
    try {
      await this.softDelete(id);
      return true;
    } catch (err) {
      return false;
    }
  }
}
