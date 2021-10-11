import { createConnection } from 'typeorm';
import { SqliteTypeOrmConnection } from './connections';

const connection = createConnection(SqliteTypeOrmConnection);

export default connection;
