import { createConnection, Connection, Repository, getRepository } from 'typeorm';

export const dbConnection = async () => {

  createConnection({
    host: 'mariadb',
    type: 'mysql',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["./data/Entities/*.ts"],
  }).then(connection => {
    console.log("DB Connected")
  }).catch(error => console.log("No Connection"));
}