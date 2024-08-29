## Description
This project is designed to synchronize asset data from an external API into a PostgreSQL database using NestJS and TypeORM. The project includes a daily Cron job that fetches asset data and inserts it into the database.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# setup migration
$ npm run migration:run
$ npm run migration:revert
$ npm run migration:create
$ npm run migration:update

# seed location 
$ npm run seed

```


