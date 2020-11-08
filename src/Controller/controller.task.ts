import { getRepository } from "typeorm"
import { Task } from '../data/Entities/Task';

export const getAllTasks = async (req, res) => {
  const taskRepository = await getRepository(Task);
  const tasks = await taskRepository.find();
  res.send({ data: tasks });
};

export const getTaskByID = async (req, res) => {
  const taskId = req.params.taskId;
  const taskRepository = await getRepository(Task);

  try {
    const task = await taskRepository.findOneOrFail(taskId);
    res.send({
      data: task,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const deleteTaksByID = async (req, res) => {
  const taskId = req.params.taskId;
  const taskRepository = await getRepository(Task);

  try {
    const task = await taskRepository.findOneOrFail(taskId);
    await taskRepository.remove(task);
    res.send({});
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const UpdateTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  const { name, description } = req.body;
  const taskRepository = await getRepository(Task);

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
      status: "not_found",
    });
  }
};

export const createTask = async (req, res) => {
  const { name, description } = req.body;

  const task = new Task();
  task.name = name;
  task.description = description;

  const taskRepository = await getRepository(Task);
  const createdTask = await taskRepository.save(task);

  res.send({
    data: createdTask,
  });
};
