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
  it('should return empty array when there are no users', async () => {
    userRepository.findAllUsers = jest.fn(
      () => new Promise(resolve => resolve([])),
    );

    const usersList = await userService.findAllUsers();
    expect(usersList).toEqual([]);
    expect(userRepository.findAllUsers).toHaveBeenCalledTimes(1);
  });

  it('should return a list of users', async () => {
    userRepository.findAllUsers = jest.fn(
      () => new Promise(resolve => resolve(users)),
    );

    const usersList = await userService.findAllUsers();
    expect(usersList).toEqual(users);
    expect(userRepository.findAllUsers).toHaveBeenCalledTimes(1);
  });

  // Find user
  it('should return a user', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userRepository.findOneUser = jest.fn(
      (id: string) => new Promise(resolve => resolve(users[0])),
    );

    const id = '1234';
    const user = await userService.findUser(id);

    expect(user).toEqual(users[0]);
    expect(userRepository.findOneUser).toHaveBeenCalledWith(id);
    expect(userRepository.findOneUser).toHaveBeenCalledTimes(1);
  });

  // Create user
  it('should create a user if all properties are informed', async () => {
    userRepository.createUser = jest.fn(
      (user: CreateUser) =>
        new Promise(resolve =>
          resolve({
            id: '1234',
            ...user,
          }),
        ),
    );

    const userCreated = await userService.createUser({
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

  it('should not create a user if there are missing properties', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userRepository.createUser = jest.fn(
      (user: CreateUser) => new Promise(resolve => resolve(false)),
    );

    const isUserCreated = await userService.createUser({
      name: 'Test',
      age: 18,
      city: '',
    });
    expect(isUserCreated).toBe(false);
  });

  // Update user
  it('should update user', async () => {
    userRepository.updateUser = jest.fn(
      (user: UpdateUser) =>
        new Promise(resolve =>
          resolve({
            ...users[0],
            ...user,
          }),
        ),
    );

    const id = '1234';

    const userUpdated = (await userService.updateUser({
      id,
      name: 'Teste update',
    })) as User;

    expect(userUpdated).toBeTruthy();
    expect(userUpdated.name).toEqual('Teste update');
  });

  it('should not update user if user is not found', async () => {
    userRepository.updateUser = jest.fn(
      (user: UpdateUser) =>
        new Promise((resolve) => {
          if (users[0].id === user.id) {
            resolve({
              ...users[0],
              ...user,
            });
          }
          // eslint-disable-next-line prefer-promise-reject-errors
          resolve(false);
        }),
    );

    const id = '';

    const userUpdated = (await userService.updateUser({
      id,
      name: 'Teste update',
    })) as User;

    expect(userRepository.updateUser).toBeCalledTimes(1);
    expect(userUpdated).toBe(false);
  });

  it("should not update user if there aren't new data", async () => {
    userRepository.updateUser = jest.fn(
      (user: UpdateUser) =>
        new Promise((resolve, reject) => {
          if (users[0].id === user.id) {
            resolve({
              ...users[0],
              ...user,
            });
            // eslint-disable-next-line prefer-promise-reject-errors
          } else reject(false);
        }),
    );

    const id = '1234';

    const userUpdated = (await userService.updateUser({
      id,
    })) as User;

    expect(userUpdated).toBe(false);
  });

  // Delete user
  it('should delete user', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userRepository.findOneUser = jest.fn(
      (id: string) => new Promise(resolve => resolve(users[0])),
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userRepository.removeUser = jest.fn(
      (id: string) => new Promise(resolve => resolve(true)),
    );

    const id = '1234';
    const userRemoved = await userService.removeUser(id);

    expect(userRemoved).toBe(true);
    expect(userRepository.removeUser).toHaveBeenCalledTimes(1);
    expect(userRepository.removeUser).toHaveBeenCalledWith(id);
  });

  it('should not delete user if no id is informed', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userRepository.findOneUser = jest.fn(
      (id: string) => new Promise(resolve => resolve(users[0])),
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userRepository.removeUser = jest.fn(
      (id: string) => new Promise(resolve => resolve(true)),
    );

    const id = '';
    const userRemoved = await userService.removeUser(id);

    expect(userRemoved).toBe(false);
    expect(userRepository.removeUser).toHaveBeenCalledTimes(0);
  });
});
