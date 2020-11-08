import express from 'express';
import {dbConnection} from './data/DB_Connection/createDBConnection';
import {globalRouter} from './data/Router/router.global';
import * as bodyParser from 'body-parser';

export const server = async () => {
  try {
    const app = express();
    const port = 3000;
    await dbConnection();
    app.use(bodyParser.json());

    app.use('/api', globalRouter);


    app.get('/', (req, res) => {
      res.send('Hello FWE students!');
    });

    app.listen(port, () => {
      console.log(`[Express]: Listening at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

server();
