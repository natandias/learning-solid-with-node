import { EntityRepository, Repository } from 'typeorm';
import UserEntity from '../entities/user.entity';
import CreateUserDto from '../interfaces/dtos/createUser.dto';
import UpdateUserDto from '../interfaces/dtos/updateUser.dto';
import FindAllUsersDto from '../interfaces/dtos/findAllUsers.dto';

@EntityRepository(UserEntity)
export default class UserRepository extends Repository<UserEntity> {
  async findAllUsers(params?: FindAllUsersDto) {
    const users = params
      ? await this.find({ where: params })
      : await this.find({});
    return users.map(user => ({
      ...user,
      id: String(user.id),
      age: Number(user.age),
    }));
  }

  async findOneUser(id: string) {
    const user = await this.findOne(id);
    if (!user) throw new Error('User not found');
    return { ...user, id: String(id), age: Number(user.age) };
  }

  async createUser({ name, age, city }: CreateUserDto) {
    if (!name || !age || !city) throw new Error('Missing params');

    const userExists = await this.findAllUsers({ name });
    if (userExists.length > 0) throw new Error('User already exists');

    const user = new UserEntity();

    user.name = name;
    user.age = age;

    user.city = city;
    await this.save(user);

    return { ...user, id: String(user.id), age: Number(user.age) };
  }

  async updateUser({ id, ...otherFields }: UpdateUserDto) {
    await this.findOneUser(id);

    if (Object.keys(otherFields).length !== 0) {
      await this.update(id, otherFields);
    }

    const updatedUser = await this.findOneUser(id);
    return updatedUser;
  }

  async removeUser(id: string) {
    await this.findOneUser(id);

    await this.softDelete(id);
    return true;
  }
}
