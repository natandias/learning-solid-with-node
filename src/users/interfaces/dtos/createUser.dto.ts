import User from '../user.interface';

export default interface CreateUser
  extends Pick<User, 'name' | 'age' | 'city'> {}
