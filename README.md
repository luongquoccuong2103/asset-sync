## Description
This project is designed to synchronize asset data from an external API into a PostgreSQL database using NestJS and TypeORM. The project includes a daily Cron job that fetches asset data and inserts it into the database.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (>= 16.x)
- PostgreSQL (>= 13.x)
- Docker (optional, for containerized deployment)
  
## Project setup

```bash
$ npm install
```

## Docker Setup
Use Docker Compose to run PostgreSQL:

& docker-compose up -d
The database will be accessible at localhost:5432 with the name assetdb.

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
## Cronjob 
The application has a daily Cron job that runs at midnight to synchronize assets from an external API. The synchronization logic is implemented in the syncAssets method within the AssetService.
To test the Cron job manually, you can trigger it using:
$ curl http://localhost:3000/assets/sync


