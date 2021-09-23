import User from '../interfaces/user.interface';

export default abstract class UserRepository {
  abstract findAll(): User[];

  abstract findOne(): User;

  abstract create(): void;

  abstract update(): void;

  abstract remove(): void;
}
