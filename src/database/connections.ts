import { ConnectionOptions } from 'typeorm';

const SqliteTypeOrmConnection: ConnectionOptions = {
  name: 'default',
  type: 'sqlite',
  database: 'src/database/database.sqlite',
  entities: ['src/**/entities/*.entity.{ts,js}'],
  synchronize: true,
  logging: false,
};

export { SqliteTypeOrmConnection };
