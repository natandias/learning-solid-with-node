import { createConnection, getConnection } from 'typeorm';
import UserRepository from '../user.repository';
import UserEntity from '../../entities/user.entity';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [UserEntity],
      synchronize: true,
      logging: false,
    });

    userRepository = getConnection().getCustomRepository(UserRepository);

    return connection;
  });

  afterEach(() => {
    const conn = getConnection();
    return conn.close();
  });

  // List
  it('should return a list of users', async () => {
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

    expect(usersList[0]).toHaveProperty('id');
    expect(usersList[0]).toHaveProperty('createdAt');
    expect(usersList[0]).toHaveProperty('updatedAt');
    expect(usersList[0]).toHaveProperty('deletedAt');
    expect(usersList[0].name).toBe('jest');
    expect(usersList[0].age).toBe(20);
    expect(usersList[0].city).toBe('Diamantina');

    expect(usersList[1]).toHaveProperty('id');
    expect(usersList[1]).toHaveProperty('createdAt');
    expect(usersList[1]).toHaveProperty('updatedAt');
    expect(usersList[1]).toHaveProperty('deletedAt');
    expect(usersList[1].name).toBe('jest2');
    expect(usersList[1].age).toBe(21);
    expect(usersList[1].city).toBe('Ouro Preto');
  });

  it('should return empty array when there are no users', async () => {
    const usersList = await userRepository.findAllUsers();
    expect(usersList).toEqual([]);
  });

  // Find One
  it('should return a user', async () => {
    const user = {
      name: 'Jest',
      age: 20,
      city: 'Salvador',
    };

    const createdUser = await userRepository.createUser(user);

    const foundUser = await userRepository.findOneUser(String(createdUser.id));
    expect(foundUser).toHaveProperty('id');
    expect(foundUser).toHaveProperty('createdAt');
    expect(foundUser).toHaveProperty('updatedAt');
    expect(foundUser).toHaveProperty('deletedAt');
    expect(foundUser.name).toBe('Jest');
    expect(foundUser.age).toBe(20);
    expect(foundUser.city).toBe('Salvador');
  });

  it('should return error if user is not found', async () => {
    await expect(() => userRepository.findOneUser('1234')).rejects.toThrow(
      new Error('User not found'),
    );
  });

  // Create
  it('should create and return user', async () => {
    const userCreated = await userRepository.createUser({
      name: 'Jest',
      age: 20,
      city: 'Salvador',
    });

    expect(userCreated).toHaveProperty('id');
    expect(userCreated).toHaveProperty('createdAt');
    expect(userCreated).toHaveProperty('updatedAt');
    expect(userCreated).toHaveProperty('deletedAt');
    expect(userCreated.name).toBe('Jest');
    expect(userCreated.age).toBe(20);
    expect(userCreated.city).toBe('Salvador');
  });

  it('should not create user if params are missing', async () => {
    await expect(() =>
      userRepository.createUser({
        name: 'Jest',
        age: 20,
        city: '',
      }),
    ).rejects.toThrow(new Error('Missing params'));
  });

  it('should not create user if it already exists another user with same name', async () => {
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

    await expect(() => userRepository.createUser(user2)).rejects.toThrow(
      new Error('User already exists'),
    );
  });

  // Update
  it('should update user', async () => {
    const user = await userRepository.createUser({
      name: 'Jest',
      age: 20,
      city: 'Diamantina',
    });

    const userUpdated = await userRepository.updateUser({
      id: user.id,
      name: 'Natan',
    });

    expect(userUpdated).toHaveProperty('id');
    expect(userUpdated).toHaveProperty('createdAt');
    expect(userUpdated).toHaveProperty('updatedAt');
    expect(userUpdated).toHaveProperty('deletedAt');
    expect(userUpdated.name).toBe('Natan');
    expect(userUpdated.age).toBe(20);
    expect(userUpdated.city).toBe('Diamantina');
  });

  it("should not update user if user doesn't exists", async () => {
    const user = {
      id: '1234',
      name: 'Natan',
    };
    await expect(() => userRepository.updateUser(user)).rejects.toThrow(
      new Error('User not found'),
    );
  });

  it("should return the same item if there aren't new data", async () => {
    const user = await userRepository.createUser({
      name: 'Jest',
      age: 20,
      city: 'Diamantina',
    });

    const userUpdated = await userRepository.updateUser({
      id: user.id,
    });

    expect(userUpdated).toBeTruthy();
    expect(userUpdated).toHaveProperty('id');
    expect(userUpdated).toHaveProperty('createdAt');
    expect(userUpdated).toHaveProperty('updatedAt');
    expect(userUpdated).toHaveProperty('deletedAt');
    expect(userUpdated.name).toBe('Jest');
    expect(userUpdated.age).toBe(20);
    expect(userUpdated.city).toBe('Diamantina');
  });

  // Remove
  it('should remove user', async () => {
    const newUser = await userRepository.createUser({
      name: 'Jest',
      age: 20,
      city: 'Diamantina',
    });

    const deletedUser = await userRepository.removeUser(newUser.id);
    expect(deletedUser).toBe(true);
    await expect(() => userRepository.findOneUser(newUser.id)).rejects.toThrow(
      new Error('User not found'),
    );
  });

  it("shouldn't remove user if it doesn't exists", async () => {
    await expect(() => userRepository.removeUser('1234')).rejects.toThrow(
      new Error('User not found'),
    );
  });
});
