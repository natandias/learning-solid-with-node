import UserEntity from '../userInMemory.local.entity';

describe('UserEntity', () => {
  let userEntity: UserEntity;
  beforeAll(() => {
    userEntity = new UserEntity();
  });

  it('should create and return a user', () => {
    const user = userEntity.create({
      name: 'Jest',
      age: 28,
      city: 'Salvador',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Jest');
    expect(user.age).toBe(28);
    expect(user.city).toBe('Salvador');
  });
});
