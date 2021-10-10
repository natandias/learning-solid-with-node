import UserInMemoryRepository from '../userInMemory.repository';
import UserEntity from '../../entities/user.entity';
import UserRepository from '../../interfaces/userRepository.interface';
import CreateUser from '../../interfaces/dtos/createUser.dto';

describe('UserInMemoryRepository', () => {
  let userRepository: UserRepository;
  let userEntity: UserEntity;

  beforeEach(() => {
    userEntity = new UserEntity();
    userRepository = new UserInMemoryRepository(userEntity);
  });

  // List
  it('should return a list of users', () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
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

    userRepository.create(user1);
    userRepository.create(user2);

    const usersList = userRepository.findAll();
    expect(usersList.length).toBe(2);
    expect(usersList[0]).toEqual({
      id: '1234',
      ...user1,
    });
    expect(usersList[1]).toEqual({
      id: '1234',
      ...user2,
    });
    expect(userEntity.create).toBeCalledTimes(2);
  });

  it('should return empty array when there are no users', () => {
    const usersList = userRepository.findAll();
    expect(usersList).toEqual([]);
  });

  // Find One
  it('should return a user', () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      ...user,
    }));

    const user = {
      name: 'Jest',
      age: 20,
      city: 'Salvador',
    };

    userRepository.create(user);

    const foundUser = userRepository.findOne('1234');
    expect(foundUser).toEqual({ id: '1234', ...user });
  });

  it('should return error if user is not found', () => {
    const user = userRepository.findOne('1234');
    expect(user).toBe('User not found');
  });

  // Create
  it('should create and return user', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      ...user,
    }));

    const userCreated = userRepository.create({
      name: 'Jest',
      age: 20,
      city: 'Salvador',
    });

    expect(userCreated).toEqual({
      id: '1234',
      name: 'Jest',
      age: 20,
      city: 'Salvador',
    });
  });

  it('should not create user if params are missing', () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      ...user,
    }));

    const userCreated = userRepository.create({
      name: 'Jest',
      age: 20,
      city: '',
    });

    expect(userCreated).toBe(false);
  });

  // Update
  it('should update user', () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      ...user,
    }));

    const user = userRepository.create({
      name: 'Jest',
      age: 20,
      city: 'Diamantina',
    });

    const userUpdated = userRepository.update({ id: '1234', name: 'Natan' });
    expect(userUpdated).toEqual({ ...user, id: '1234', name: 'Natan' });
  });

  it("should not update user if user doesn't exists", () => {
    const userUpdated = userRepository.update({ id: '1234', name: 'Natan' });
    expect(userUpdated).toBe(false);
  });

  it("should return the same item if there aren't new data", () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      ...user,
    }));

    const user = userRepository.create({
      name: 'Jest',
      age: 20,
      city: 'Diamantina',
    });

    const userUpdated = userRepository.update({
      id: '1234',
    });

    expect(userUpdated).toEqual({ id: '1234', ...user });
  });

  // Remove
  it('should remove user', () => {
    userEntity.create = jest.fn((user: CreateUser) => ({
      id: '1234',
      ...user,
    }));

    userRepository.create({
      name: 'Jest',
      age: 20,
      city: 'Diamantina',
    });

    const deletedUser = userRepository.remove('1234');
    expect(deletedUser).toBe(true);
  });

  it("shouldn't remove user if it doesn't exists", () => {
    const deletedUser = userRepository.remove('1234');
    expect(deletedUser).toBe(false);
  });
});
