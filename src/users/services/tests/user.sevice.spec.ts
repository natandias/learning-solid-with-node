import IUserService from '../../interfaces/userService.interface';
import IUserRepository from '../../interfaces/userRepository.interface';
import UserService from '../user.service';
import UserInMemoryRepository from '../../repositories/userInMemory.repository';
import User from '../../interfaces/user.interface';
import CreateUser from '../../interfaces/dtos/createUser.dto';
import UpdateUser from '../../interfaces/dtos/updateUser.dto';

describe('UserService', () => {
  let userService: IUserService;
  let userRepository: IUserRepository;
  const users: User[] = [{ id: '1234', name: 'Test', age: 18, city: 'BH' }];

  beforeAll(() => {
    userRepository = new UserInMemoryRepository();
  });

  // List users
  it('should return empty array when there are no users', () => {
    userRepository.findAll = jest.fn(() => []);
    userService = new UserService(userRepository);

    const usersList = userService.findAllUsers();
    expect(usersList).toEqual([]);
    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return a list of users', () => {
    userRepository.findAll = jest.fn(() => users);
    userService = new UserService(userRepository);

    const usersList = userService.findAllUsers();
    expect(usersList).toEqual(users);
    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
  });

  // Find user
  it('should return a user', () => {
    userRepository.findOne = jest.fn((id: string) => users[0]);
    userService = new UserService(userRepository);

    const id = '1234';
    const user = userService.findUser(id);

    expect(user).toEqual(users[0]);
    expect(userRepository.findOne).toHaveBeenCalledWith(id);
    expect(userRepository.findOne).toHaveBeenCalledTimes(1);
  });

  // Create user
  it('should create a user if all properties are informed', () => {
    userRepository.create = jest.fn((user: CreateUser) => true);
    userService = new UserService(userRepository);

    const isUserCreated = userService.createUser({
      name: 'Test',
      age: 18,
      city: 'BH',
    });
    expect(isUserCreated).toBe(true);
  });

  it('should not create a user if there are missing properties', () => {
    userRepository.create = jest.fn((user: CreateUser) => true);
    userService = new UserService(userRepository);

    const isUserCreated = userService.createUser({
      name: 'Test',
      age: 18,
      city: '',
    });
    expect(isUserCreated).toBe(false);
  });

  // Update user
  it('should update user', () => {
    userRepository.update = jest.fn((user: UpdateUser) => ({
      ...users[0],
      ...user,
    }));
    userService = new UserService(userRepository);

    const id = '1234';

    const userUpdated = userService.updateUser({
      id,
      name: 'Teste update',
    }) as User;

    expect(userUpdated).toBeTruthy();
    expect(userUpdated.name).toEqual('Teste update');
  });

  it('should not update user if user are not found', () => {
    userRepository.update = jest.fn((user: UpdateUser) => {
      if (users[0].id === user.id) {
        return {
          ...users[0],
          ...user,
        };
      }
      return false;
    });
    userService = new UserService(userRepository);

    const id = '';

    const userUpdated = userService.updateUser({
      id,
      name: 'Teste update',
    }) as User;

    expect(userUpdated).toBe(false);
  });

  it("should not update user if there aren't new data", () => {
    userRepository.update = jest.fn((user: UpdateUser) => {
      if (users[0].id === user.id) {
        return {
          ...users[0],
          ...user,
        };
      }
      return false;
    });
    userService = new UserService(userRepository);

    const id = '1234';

    const userUpdated = userService.updateUser({
      id,
    }) as User;

    expect(userUpdated).toBe(false);
  });

  // Delete user
  it('should delete user', () => {
    userRepository.findOne = jest.fn((id: string) => users[0]);
    userRepository.remove = jest.fn((id: string) => true);
    userService = new UserService(userRepository);

    const id = '1234';
    const userRemoved = userService.removeUser(id);

    expect(userRemoved).toBe(true);
    expect(userRepository.remove).toHaveBeenCalledTimes(1);
    expect(userRepository.remove).toHaveBeenCalledWith(id);
  });

  it('should not delete user if no id is informed', () => {
    userRepository.findOne = jest.fn((id: string) => users[0]);
    userRepository.remove = jest.fn((id: string) => true);
    userService = new UserService(userRepository);

    const id = '';
    const userRemoved = userService.removeUser(id);

    expect(userRemoved).toBe(false);
    expect(userRepository.remove).toHaveBeenCalledTimes(0);
  });
});
