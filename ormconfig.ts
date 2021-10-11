const config = {
  autoLoadEntities: true,
  cli: {
    entitiesDir: 'src/**/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscribers',
  },
};

export default config;
