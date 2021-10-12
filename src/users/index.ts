// import { getConnection } from 'typeorm';
import UserController from './controllers/user.controller';
// import UserRepository from './repositories/user.repository';
import UserService from './services/user.service';
import UserInMemoryRepository from './repositories/userInMemory.repository';
import UserEntity from './entities/userInMemory.local.entity';

/* 
  To save data in Sqlite database, uncomment the lines 1, 3 and 15
    and comment lines 5, 6, 13 e 14
*/
const UserFactory = () => {
  const userEntity = new UserEntity();
  const userRepository = new UserInMemoryRepository(userEntity);
  // const userRepository = getConnection().getCustomRepository(UserRepository);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  return userController;
};

export default UserFactory;
