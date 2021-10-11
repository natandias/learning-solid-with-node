import { createConnection } from 'typeorm';
import { SqliteTypeOrmConnection } from './database/connections';

createConnection(SqliteTypeOrmConnection)
  .then(() => {
    import('./app');
  })
  // eslint-disable-next-line no-console
  .catch(err => console.log(err));
