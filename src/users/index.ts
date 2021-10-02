import UserController from './controllers/user.controller';
import UserService from './user.service';
import UserInMemoryRepository from './repositories/userInMemory.repository';

const UserFactory = () => {
  const userRepository = new UserInMemoryRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  return userController;
};

export default UserFactory;
