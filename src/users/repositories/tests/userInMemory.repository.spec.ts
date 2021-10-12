import UserInMemoryRepository from '../userInMemory.repository';
import UserEntity from '../../entities/userInMemory.local.entity';
import UserRepository from '../../interfaces/userRepository.interface';
import CreateUser from '../../interfaces/dtos/createUser.dto';

describe('UserInMemoryRepository', () => {
  let userRepository: UserRepository;
  let userEntity: UserEntity;
  let currentDate: Date;

  beforeEach(() => {
    userEntity = new UserEntity();
    userRepository = new UserInMemoryRepository(userEntity);
    currentDate = new Date();
  });

  // List
  it('should return a list of users', async () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user,
    }));

    const user1 = {
      name: 'jest',
      age: 20,
      city: 'Diamantina',
    };

    const user2 = {
      name: 'jest2',
      age: 21,
      city: 'Ouro Preto',
    };

    await userRepository.createUser(user1);
    await userRepository.createUser(user2);

    const usersList = await userRepository.findAllUsers();
    expect(usersList.length).toBe(2);
    expect(usersList[0]).toEqual({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user1,
    });
    expect(usersList[1]).toEqual({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user2,
    });
    expect(userEntity.create).toBeCalledTimes(2);
  });

  it('should return a list of users filtered by params', async () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user,
    }));

    const user1 = {
      name: 'jest',
      age: 20,
      city: 'Diamantina',
    };

    const user2 = {
      name: 'jest2',
      age: 21,
      city: 'Ouro Preto',
    };

    await userRepository.createUser(user1);
    await userRepository.createUser(user2);

    const usersList = await userRepository.findAllUsers({
      age: 21,
    });

    expect(usersList.length).toBe(1);
    expect(usersList[0]).toEqual({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user2,
    });
    expect(userEntity.create).toBeCalledTimes(2);

    const user3 = {
      name: 'jest3',
      age: 21,
      city: 'Ouro Preto',
    };

    await userRepository.createUser(user3);

    const usersList2 = await userRepository.findAllUsers({
      age: 21,
    });

    expect(usersList2.length).toBe(2);
    expect(usersList2[1]).toEqual({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user3,
    });
    expect(userEntity.create).toBeCalledTimes(3);
  });

  it('should return empty array when there are no users', async () => {
    const usersList = await userRepository.findAllUsers();
    expect(usersList).toEqual([]);
  });

  // Find One
  it('should return a user', async () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user,
    }));

    const user = {
      name: 'Jest',
      age: 20,
      city: 'Salvador',
    };

    await userRepository.createUser(user);

    const foundUser = await userRepository.findOneUser('1234');
    expect(foundUser).toEqual({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user,
    });
  });

  it('should return error if user is not found', async () => {
    await expect(() => userRepository.findOneUser('1234')).rejects.toThrow(
      new Error('User not found'),
    );
  });

  // Create
  it('should create and return user', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user,
    }));

    const userCreated = await userRepository.createUser({
      name: 'Jest',
      age: 20,
      city: 'Salvador',
    });

    expect(userCreated).toEqual({
      id: '1234',
      name: 'Jest',
      age: 20,
      city: 'Salvador',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
    });
  });

  it('should not create user if params are missing', async () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user,
    }));

    expect(
      userRepository.createUser({
        name: 'Jest',
        age: 20,
        city: '',
      }),
    ).rejects.toThrow('Missing params');
  });

  it('should not create user if it already exists another user with same name', async () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user,
    }));

    await userRepository.createUser({
      name: 'Jest',
      age: 20,
      city: 'Montes Claros',
    });

    const user2 = {
      name: 'Jest',
      age: 21,
      city: 'Belo Horizonte',
    };

    expect(userRepository.createUser(user2)).rejects.toThrow(
      'User already exists',
    );
  });

  // Update
  it('should update user', async () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user,
    }));

    const user = await userRepository.createUser({
      name: 'Jest',
      age: 20,
      city: 'Diamantina',
    });

    const userUpdated = await userRepository.updateUser({
      id: '1234',
      name: 'Natan',
    });
    expect(userUpdated).toEqual({
      ...user,
      id: '1234',
      name: 'Natan',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
    });
  });

  it("should not update user if user doesn't exists", async () => {
    await expect(() =>
      userRepository.updateUser({
        id: '12345',
        name: 'Natan',
      }),
    ).rejects.toThrow(new Error('User not found'));
  });

  it("should return the same item if there aren't new data", async () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user,
    }));

    const user = await userRepository.createUser({
      name: 'Jest',
      age: 20,
      city: 'Diamantina',
    });

    const userUpdated = await userRepository.updateUser({
      id: '1234',
    });

    expect(userUpdated).toEqual({
      id: '1234',
      ...user,
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
    });
  });

  // Remove
  it('should remove user', async () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: undefined,
      ...user,
    }));

    await userRepository.createUser({
      name: 'Jest',
      age: 20,
      city: 'Diamantina',
    });

    const deletedUser = await userRepository.removeUser('1234');
    expect(deletedUser).toBe(true);
    expect(userRepository.findOneUser('1234')).rejects.toThrow(
      'User not found',
    );
  });

  it("shouldn't remove user if it doesn't exists", async () => {
    userRepository.findOneUser = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (id: string) =>
        new Promise((resolve, reject) => reject(new Error('User not found'))),
    );

    await expect(() => userRepository.removeUser('1234')).rejects.toThrow(
      new Error('User not found'),
    );
  });
});
