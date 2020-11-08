import express, {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {Task} from './data/Entities/Task';
import {dbConnection} from './data/DB_Connection/createDBConnection';
import * as bodyParser from 'body-parser';

export const SERVER = async () => {
  try {
    await dbConnection();
    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
      res.send('Test du Hund!');
    });

    app.listen(port, () => {
      console.log(`[Express]: Listening at http://localhost:${port}`);
    });

    app.use(bodyParser.json());

    app.get('/task', async (req, res) => {
      const taskRepository = getRepository(Task);
      const tasks = await taskRepository.find();
      res.send({data: tasks});
    });

    app.get('/task/:taskId', async (req, res) => {
      const taskId = req.params.taskId;
      const taskRepository = getRepository(Task);

      try {
        const task = await taskRepository.findOneOrFail(taskId);
        res.send({
          data: task,
        });
      } catch (error) {
        res.status(404).send({
          status: 'not_found',
        })
      }

    });

    app.delete('/task/:taskId', async (req, res) => {
      const taskId = req.params.taskId;
      const taskRepository = getRepository(Task);

      try {
        const task = await taskRepository.findOneOrFail(taskId);
        await taskRepository.remove(task);
        res.send({});
      } catch (error) {
        res.status(404).send({
          status: 'not_found',
        })
      }

    });

    app.patch('/task/:taskId', async (req, res) => {
      const taskId = req.params.taskId;
      const { name, description } = req.body;
      const taskRepository = getRepository(Task);

      try {
        let task = await taskRepository.findOneOrFail(taskId);
        task.name = name;
        task.description = description;

        task = await taskRepository.save(task);

        res.send({
          data: task,
        });
      } catch (error) {
        res.status(404).send({
          status: 'not_found',
        })
      }

    });

    app.post('/task', async (req, res) => {
      const { name, description } = req.body;

      let task = new Task();
      task.name = name;
      task.description = description;

      const taskRepository = getRepository(Task);
      const createdTask = await taskRepository.save(task);

      res.send({
        data: createdTask,
      });
    });


  }
  catch (e) {
    console.log(e);
    throw e;
  }

};

SERVER();
