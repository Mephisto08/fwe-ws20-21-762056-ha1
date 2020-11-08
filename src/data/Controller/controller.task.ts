import {getRepository} from 'typeorm';
import {Task} from '../Entities/Task';

export const getAllTasks = async (req, res) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find();
  res.send({data: tasks});
};

export const getTaskById = async (req, res) => {
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
    });
  }
};

export const deleteTaksById = async (req, res) => {
  const taskId = req.params.taskId;
  const taskRepository = getRepository(Task);

  try {
    const task = await taskRepository.findOneOrFail(taskId);
    await taskRepository.remove(task);
    res.send({});
  } catch (error) {
    res.status(404).send({
      status: 'not_found',
    });
  }
};

export const UpdateTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  const {name, description} = req.body;
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
    });
  }
};

export const createTask = async (req, res) => {
  const {name, description} = req.body;

  const task = new Task();
  task.name = name;
  task.description = description;

  const taskRepository = getRepository(Task);
  const createdTask = await taskRepository.save(task);

  res.send({
    data: createdTask,
  });
};

/*
export const addLabel = async (req, res) =>{
  const {id} = req.body;
}*/
