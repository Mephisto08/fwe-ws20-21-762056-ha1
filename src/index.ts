/* eslint-disable */
import express from 'express';
import {dbConnection} from './data/DB_Connection/createDBConnection';
import {globalRouter} from './data/Router/router.global';
import * as bodyParser from 'body-parser';

// Client-ID 499266165189-3d7j55iomns0u75pj01fookn2sraq5lr.apps.googleusercontent.com
// Clientschlüssel yqP4c87EjmOwgM1UVtefR-PQ
export const server = async () => {
  try {
    const app = express();
    const port = 3000;
    await dbConnection();

    app.use(bodyParser.json());

    app.use('/api', globalRouter);
    app.get('/', (req, res) => {
      res.send('Hallo das ist dein Timetracker! Nutzen Sie "http://localhost:3000/api" um in die Anwendung zukommen.');
    });

    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

server();
