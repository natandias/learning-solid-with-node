import { EntityRepository, Repository } from 'typeorm';
import UserEntity from '../entities/user.entity';
import CreateUserDto from '../interfaces/dtos/createUser.dto';
import UpdateUserDto from '../interfaces/dtos/updateUser.dto';

@EntityRepository(UserEntity)
export default class UserRepository extends Repository<UserEntity> {
  async findAllUsers() {
    const users = await this.find({});
    return users.map(user => ({ ...user, age: Number(user.age) }));
  }

  async findOneUser(id: string) {
    const user = await this.findOne(id);
    return user ? { ...user, age: Number(user.age) } : 'User not found';
  }

  async createUser({ name, age, city }: CreateUserDto) {
    if (!name || !age || !city) return false;

    const user = new UserEntity();

    user.name = name;
    user.age = String(age);

    user.city = city;
    await this.save(user);

    return { ...user, age: Number(user.age) };
  }

  async updateUser({ id, ...otherFields }: UpdateUserDto) {
    if (Object.keys(otherFields).length !== 0)
      await this.update(id, otherFields);

    const updatedUser = await this.findOneUser(id);
    return updatedUser === 'User not found' ? false : updatedUser;
  }

  async removeUser(id: string) {
    const user = await this.findOneUser(id);
    if (user === 'User not found') return false;

    await this.softDelete(id);
    return true;
  }
}
