import {Helper} from '../../helper';
import request from 'supertest';
import {Task} from '../../../data/Entities/Task';
import { Tracking } from '../../../data/Entities/Tracking';


const helper = new Helper();
helper.init();

describe('Tests for the Task class', () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it('addLabelsByTaskId Test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }
    request(helper.app)
        .post(`/api/task/label/${task.id}`)
        .send({
          labelList: [1],
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          expect(res.body.data.__labels__.length).toBe(3);
          expect(res.body.data.__labels__[2].id).toBe(3);
          done();
        });
  });
  it('createTask Test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
        .post('/api/task')
        .send({
          name: 'Task Test 4',
          description: 'Beschreibung Test 4',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          const [, task] =
            await helper.getRepo(Task).findAndCount();
          expect(task).toBe(4);
          expect(res.body.data.name).toBe('Task Test 4');
          expect(res.body.data.description).toBe('Beschreibung Test 4');
          done();
        });
  });
  it('deleteLabelsByTaskId Test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }
    request(helper.app)
        .delete(`/api/task/label/${task.id}`)
        .send({
          labelList: [2],
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          expect(res.body.data.__labels__.length).toBe(1);
          expect(res.body.data.__labels__[0].id).toBe(3);
          done();
        });
  });
  it('deleteTaskById Test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }
    request(helper.app)
        .delete(`/api/task/${task.id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          const [, task] =
            await helper.getRepo(Task).findAndCount();
          expect(task).toBe(2);
          const [, tracking] =
          await helper.getRepo(Tracking).findAndCount();
          expect(tracking).toBe(2);
          done();
        });
  });
  it('getAllTasks Test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
        .get('/api/task')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.data.length).toBe(3);
          expect(res.body.data[1].name).toBe('Task Test 2');
          expect(res.body.data[1].description).toBe('Beschreibung Test 2');
          done();
        });
  });
  it('getTaskById Test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }


    request(helper.app)
        .get(`/api/task/${task.id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          const [, task] =
            await helper.getRepo(Task).findAndCount();
          expect(task).toBe(3);
          expect(res.body.data.name).toBe('Task Test 2');
          expect(res.body.data.description).toBe('Beschreibung Test 2');
          done();
        });
  });
  it('updateTaskById Test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }

    request(helper.app)
        .patch(`/api/task/${task.id}`)
        .send({
          name: 'Task Test 2 Update',
          description: 'Beschreibung Test 2 Update',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          const [, task] =
            await helper.getRepo(Task).findAndCount();
          expect(task).toBe(3);
          expect(res.body.data.name).toBe('Task Test 2 Update');
          expect(res.body.data.description).toBe('Beschreibung Test 2 Update');
          done();
        });
  });
});
