import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { SqliteTypeOrmConnection } from './database/connections';

createConnection(SqliteTypeOrmConnection)
  .then(() => {
    import('./app');
  })
  // eslint-disable-next-line no-console
  .catch(err => console.log(err));
