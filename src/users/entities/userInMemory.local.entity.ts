import { v4 as uuidv4 } from 'uuid';
import CreateUser from '../interfaces/dtos/createUser.dto';

class UserEntity {
  private id: string;

  private name = '';

  private age: number;

  private city = '';

  private createdAt: Date;

  private updatedAt: Date;

  private deletedAt: Date | null;

  public create({ name, age, city }: CreateUser) {
    this.id = uuidv4();
    this.name = name;
    this.age = Number(age);
    this.city = city;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;

    return this.get();
  }

  private get() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      city: this.city,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}

export default UserEntity;
