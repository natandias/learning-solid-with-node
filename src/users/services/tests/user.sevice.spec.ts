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
  const users: User[] = [
    {
      id: '1234',
      name: 'Test',
      age: 18,
      city: 'BH',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    },
  ];

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

  it('should throw a error when repository.findAllUsers rejects with an unknown error', async () => {
    userRepository.findAllUsers = jest.fn(
      () =>
        new Promise((resolve, reject) =>
          reject(new Error('Failed to connect to db')),
        ),
    );

    await expect(() => userService.findAllUsers()).rejects.toThrow(
      new Error('An unknown error occurred'),
    );
    expect(userRepository.findAllUsers).toHaveBeenCalledTimes(1);
  });

  // Find user
  it('should return a user', async () => {
    userRepository.findOneUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (id: string) => new Promise(resolve => resolve(users[0])),
    );

    const id = '1234';
    const user = await userService.findUser(id);

    expect(user).toEqual(users[0]);
    expect(userRepository.findOneUser).toHaveBeenCalledWith(id);
    expect(userRepository.findOneUser).toHaveBeenCalledTimes(1);
  });

  it("should throw a error when repository doesn't find user", async () => {
    userRepository.findOneUser = jest.fn(
      () =>
        new Promise((resolve, reject) => reject(new Error('User not found'))),
    );
    const id = '1234';
    await expect(() => userService.findUser(id)).rejects.toThrow(
      new Error('User not found'),
    );
    expect(userRepository.findOneUser).toHaveBeenCalledTimes(1);
  });

  it('should throw a error when repository.findOneUser rejects with an unknown error', async () => {
    userRepository.findOneUser = jest.fn(
      () =>
        new Promise((resolve, reject) =>
          reject(new Error('Failed to connect to db')),
        ),
    );

    const id = '123';
    await expect(() => userService.findUser(id)).rejects.toThrow(
      new Error('An unknown error occurred'),
    );
    expect(userRepository.findOneUser).toHaveBeenCalledTimes(1);
  });

  // Create user
  it('should create a user if all properties are informed', async () => {
    userRepository.createUser = jest.fn(
      (user: CreateUser) =>
        new Promise(resolve =>
          resolve({
            id: '1234',
            createdAt: users[0].createdAt,
            updatedAt: users[0].updatedAt,
            deletedAt: undefined,
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
      createdAt: users[0].createdAt,
      updatedAt: users[0].updatedAt,
      deletedAt: undefined,
    });
  });

  it('should throw a error if there are missing properties', async () => {
    userRepository.createUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (user: CreateUser) =>
        new Promise((resolve, reject) => reject(new Error('Missing params'))),
    );

    const user = {
      name: 'Test',
      age: 18,
      city: '',
    };

    await expect(userService.createUser(user)).rejects.toThrow(
      new Error('Missing params'),
    );
    expect(userRepository.createUser).not.toBeCalled();
  });

  it('should throw a error if userRepository.createUser says there are missing properties', async () => {
    userRepository.createUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (user: CreateUser) =>
        new Promise((resolve, reject) => reject(new Error('Missing params'))),
    );

    const user = {
      name: 'Test',
      age: 18,
      city: '',
    };

    await expect(() => userService.createUser(user)).rejects.toThrow(
      new Error('Missing params'),
    );
  });

  it('should not create a user if it already exists', async () => {
    userRepository.createUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (user: CreateUser) =>
        new Promise((resolve, reject) => {
          reject(new Error('User already exists'));
        }),
    );

    const user = {
      name: 'Test',
      age: 18,
      city: 'Ouro Preto',
    };

    await expect(() => userService.createUser(user)).rejects.toThrow(
      new Error('User already exists'),
    );
  });

  it('should throw a error when repository.createUser rejects with an unknown error', async () => {
    userRepository.createUser = jest.fn(
      () =>
        new Promise((resolve, reject) =>
          reject(new Error('Failed to connect to db')),
        ),
    );

    const user = {
      name: 'Test',
      age: 18,
      city: 'BH',
    };
    await expect(() => userService.createUser(user)).rejects.toThrow(
      new Error('An unknown error occurred'),
    );
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (user: UpdateUser) =>
        new Promise((resolve, reject) => {
          reject(new Error('User not found'));
        }),
    );

    const user = {
      id: '12345',
      name: 'Teste update',
    };

    await expect(() => userService.updateUser(user)).rejects.toThrow(
      new Error('User not found'),
    );
    expect(userRepository.updateUser).toBeCalledTimes(1);
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

    await expect(() =>
      userService.updateUser({
        id,
      }),
    ).rejects.toThrow(new Error('Missing params'));
  });

  it('should throw error if userRepository.updateUser throw an undefined error', async () => {
    userRepository.updateUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (user: UpdateUser) =>
        new Promise((resolve, reject) => {
          reject(new Error('Failed'));
        }),
    );

    const user = {
      id: 'abcd',
      name: 'teste22',
    };

    await expect(() => userService.updateUser(user)).rejects.toThrow(
      new Error('An unknown error occurred'),
    );
  });

  // Delete user
  it('should delete user', async () => {
    userRepository.findOneUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (id: string) => new Promise(resolve => resolve(users[0])),
    );
    userRepository.removeUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (id: string) => new Promise(resolve => resolve(true)),
    );

    const id = '1234';
    const userRemoved = await userService.removeUser(id);

    expect(userRemoved).toBe(true);
    expect(userRepository.removeUser).toHaveBeenCalledTimes(1);
    expect(userRepository.removeUser).toHaveBeenCalledWith(id);
  });

  it('should not delete user if no id is informed', async () => {
    userRepository.findOneUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (id: string) => new Promise(resolve => resolve(users[0])),
    );
    userRepository.removeUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (id: string) => new Promise(resolve => resolve(true)),
    );

    const id = '';
    await expect(() => userService.removeUser(id)).rejects.toThrow(
      new Error('Missing params'),
    );
    expect(userRepository.removeUser).toHaveBeenCalledTimes(0);
  });

  it("should throw an error if user doesn't exists", async () => {
    userRepository.findOneUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (id: string) => new Promise(resolve => resolve(users[0])),
    );
    userRepository.removeUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (id: string) =>
        new Promise((resolve, reject) => reject(new Error('User not found'))),
    );

    const id = '1234';

    await expect(() => userService.removeUser(id)).rejects.toThrow(
      new Error('User not found'),
    );
    expect(userRepository.removeUser).toHaveBeenCalledTimes(1);
    expect(userRepository.removeUser).toHaveBeenCalledWith(id);
  });

  it('should throw an error if userRepository.removeUser throwns an unknown error', async () => {
    userRepository.findOneUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (id: string) => new Promise(resolve => resolve(users[0])),
    );
    userRepository.removeUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (id: string) =>
        new Promise((resolve, reject) => reject(new Error('Any error'))),
    );

    const id = '1234';

    await expect(() => userService.removeUser(id)).rejects.toThrow(
      new Error('An unknown error occurred'),
    );
    expect(userRepository.removeUser).toHaveBeenCalledTimes(1);
    expect(userRepository.removeUser).toHaveBeenCalledWith(id);
  });
});
