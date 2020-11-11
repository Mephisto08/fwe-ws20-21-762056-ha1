import {Helper} from '../helper';
import request from 'supertest';
import {Task} from '../../data/Entities/Task';


const helper = new Helper();
helper.init();

describe('Test for the class Task', () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it('should be able to create a new task', async (done) => {
    await helper.resetDatabase();

    request(helper.app)
        .post('/api/task')
        .send({
          name: 'TaskTest',
          description: 'DescriptionTest',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.data.name).toBe('TaskTest');
          expect(res.body.data.description).toBe('DescriptionTest');
          done();
        });
  });


  it('should return all taks', async (done) => {
    await helper.resetDatabase();
    const task = new Task();
    task.name = 'TaskTestReturnAll';
    task.description = 'Das ist ein Test';
    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
        .get('/api/task')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.data.length).toBe(1);
          expect(res.body.data[0].name).toBe(savedTask.name);
          expect(res.body.data[0].description).toBe(savedTask.description);
          done();
        });
  });
});
