import { v4 as uuidv4 } from 'uuid';
import CreateUser from '../interfaces/dtos/createUser.dto';

class UserEntity {
  private id = uuidv4();

  private name = '';

  private age = 0;

  private city = '';

  public create({ name, age, city }: CreateUser) {
    this.name = name;
    this.age = age;
    this.city = city;

    return this.get();
  }

  get() {
    return { id: this.id, name: this.name, age: this.age, city: this.city };
  }
}

export default UserEntity;
