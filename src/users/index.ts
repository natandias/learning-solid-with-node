import UserController from './controllers/user.controller';
import UserService from './services/user.service';
import UserInMemoryRepository from './repositories/userInMemory.repository';
import UserEntity from './entities/user.entity';

const UserFactory = () => {
  const userEntity = new UserEntity();
  const userRepository = new UserInMemoryRepository(userEntity);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  return userController;
};

export default UserFactory;
