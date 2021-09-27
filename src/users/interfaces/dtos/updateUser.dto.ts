import User from '../user.interface';

export default interface UpdateUser extends Partial<User> {
  id: string;
}
