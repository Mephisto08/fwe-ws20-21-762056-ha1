import {getRepository} from 'typeorm';
import {Label} from '../Entities/Label';
import {Task} from '../Entities/Task';

export const addLabelsByTaskId = async (req, res) =>{
  type NewType = number;
  const taskId = req.params.taskId;
  const {labelList} = req.body;
  const taskRepo = getRepository(Task);

  try {
    const task = await taskRepo.findOneOrFail(taskId);
    const taskLabels = await task.labels;
    const labelRepo = getRepository(Label);

    for (let i = 0; i < Object.keys(labelList).length; ++i) {
      const labelId: NewType = labelList[i];
      const label = await labelRepo.findOneOrFail(labelId);
      taskLabels.push(label);
      await taskRepo.save(task);
    }
    res.send({
      data: task,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error + taskId + 'task',
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

export const deleteLabelsByTaskId = async (req, res) =>{
  const taskId = req.params.taskId;
  const {labelList} = req.body;
  const taskRepo = getRepository(Task);

  try {
    const task = await taskRepo.findOneOrFail(taskId);
    let taskLabels = await task.labels;

    taskLabels = taskLabels.filter((label) =>
      !labelList.includes(label.labelId));

    task.labels = Promise.resolve(taskLabels);

    await taskRepo.save(task);
    res.send({
      data: task,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error + taskId + 'task',
    });
  }
};

export const deleteTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  const taskRepo = getRepository(Task);

  try {
    const task = await taskRepo.findOneOrFail(taskId);
    await taskRepo.remove(task);
    res.send({});
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

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
      status: 'Error: ' + error,
    });
  }
};

export const updateTaskById = async (req, res) => {
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
      status: 'Error: ' + error,
    });
  }
};




