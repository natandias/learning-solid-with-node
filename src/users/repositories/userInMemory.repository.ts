import UserEntity from '../entities/user.entity';
import User from '../interfaces/user.interface';
import UserRepository from '../interfaces/userRepository.interface';
import CreateUser from '../interfaces/dtos/createUser.dto';
import UpdateUser from '../interfaces/dtos/updateUser.dto';

export default class UserInMemoryRepository implements UserRepository {
  constructor(private userEntity: UserEntity) {}

  private usersList: User[] = [];

  findAll() {
    return this.usersList;
  }

  findOne(id: string) {
    return this.usersList.find(user => user.id === id) || 'User not found';
  }

  create({ name, age, city }: CreateUser) {
    if (!name || !age || !city) return false;

    const user = this.userEntity.create({
      name,
      age,
      city,
    });

    this.usersList.push(user);

    return user;
  }

  update({ id, ...otherValues }: UpdateUser) {
    const user = this.findOne(id);

    if (user === 'User not found') return false;

    this.usersList = this.usersList.map(item =>
      item.id === id ? { ...item, ...otherValues } : item,
    );
    const updatedUser = this.usersList.find(userm => userm.id === id)!;
    return updatedUser;
  }

  remove(id: string) {
    const user = this.findOne(id);

    if (user === 'User not found') return false;

    this.usersList = this.usersList.filter(item => item.id !== id);
    return true;
  }
}
