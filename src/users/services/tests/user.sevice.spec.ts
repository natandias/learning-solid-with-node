import IUserService from '../../interfaces/userService.interface';
import IUserRepository from '../../interfaces/userRepository.interface';
import UserService from '../user.service';
import UserInMemoryRepository from '../../repositories/userInMemory.repository';
import User from '../../interfaces/user.interface';
import CreateUser from '../../interfaces/dtos/createUser.dto';
import UpdateUser from '../../interfaces/dtos/updateUser.dto';
import UserEntity from '../../entities/userInMemory.local.entity';

describe('UserService', () => {
  let userEntity: UserEntity;
  let userService: IUserService;
  let userRepository: IUserRepository;
  const users: User[] = [{ id: '1234', name: 'Test', age: 18, city: 'BH' }];

  beforeAll(() => {
    userEntity = new UserEntity();
    userRepository = new UserInMemoryRepository(userEntity);
    userService = new UserService(userRepository);
  });

  // List users
  it('should return empty array when there are no users', () => {
    userRepository.find = jest.fn(() => []);

    const usersList = userService.findAllUsers();
    expect(usersList).toEqual([]);
    expect(userRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should return a list of users', () => {
    userRepository.find = jest.fn(() => users);

    const usersList = userService.findAllUsers();
    expect(usersList).toEqual(users);
    expect(userRepository.find).toHaveBeenCalledTimes(1);
  });

  // Find user
  it('should return a user', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userRepository.findOne = jest.fn((id: string) => users[0]);

    const id = '1234';
    const user = userService.findUser(id);

    expect(user).toEqual(users[0]);
    expect(userRepository.findOne).toHaveBeenCalledWith(id);
    expect(userRepository.findOne).toHaveBeenCalledTimes(1);
  });

  // Create user
  it('should create a user if all properties are informed', () => {
    userRepository.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      ...user,
    }));

    const userCreated = userService.createUser({
      name: 'Test',
      age: 18,
      city: 'BH',
    });

    expect(userCreated).toEqual({
      id: '1234',
      name: 'Test',
      age: 18,
      city: 'BH',
    });
  });

  it('should not create a user if there are missing properties', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userRepository.create = jest.fn((user: CreateUser) => false);

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

    const id = '1234';

    const userUpdated = userService.updateUser({
      id,
    }) as User;

    expect(userUpdated).toBe(false);
  });

  // Delete user
  it('should delete user', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userRepository.findOne = jest.fn((id: string) => users[0]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userRepository.remove = jest.fn((id: string) => true);

    const id = '1234';
    const userRemoved = userService.removeUser(id);

    expect(userRemoved).toBe(true);
    expect(userRepository.remove).toHaveBeenCalledTimes(1);
    expect(userRepository.remove).toHaveBeenCalledWith(id);
  });

  it('should not delete user if no id is informed', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userRepository.findOne = jest.fn((id: string) => users[0]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userRepository.remove = jest.fn((id: string) => true);

    const id = '';
    const userRemoved = userService.removeUser(id);

    expect(userRemoved).toBe(false);
    expect(userRepository.remove).toHaveBeenCalledTimes(0);
  });
});
