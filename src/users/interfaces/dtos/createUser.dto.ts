import User from '../user.interface';

export default interface CreateUser extends Omit<User, 'id'> {}
