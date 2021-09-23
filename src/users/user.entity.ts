import User from './interfaces/user.interface';

export default class UserEntity implements User {
  name = '';

  age = '';

  city = '';

  constructor(name: string, age: string, city: string) {
    this.name = name;
    this.age = age;
    this.city = city;
  }
}
