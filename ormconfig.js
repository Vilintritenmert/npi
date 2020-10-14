
module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  synchronize: false,
  autoLoadEntities: true,
  entities: ['./dist/apps/npi/libs/core/src/entities/**/*.js'],
  migrations: ['./dist/apps/npi/apps/npi/src/migrations/*.js'],
  cli: {
    migrationsDir: "./apps/npi/src/migrations",
  }
}



