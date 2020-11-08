import {getRepository} from 'typeorm';
import {Label} from '../Entities/Label';
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

export const deleteTaskById = async (req, res) => {
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


export const addLabels = async (req, res) =>{
  const taskId = req.params.taskId;
  const {labelList} = req.body;
  const taskRepo =getRepository(Task);

  try {
    const task = await taskRepo.findOneOrFail(taskId);
    const labelRepo = getRepository(Label);

    for (let i = 0; i < Object.keys(labelList).length; ++i) {
      const labelId: number = labelList[i];
      console.log(labelId + ' Test1');
      try {
        console.log(labelId + ' Test2');
        let label = await labelRepo.findOneOrFail(labelId);
        console.log('blabla  ' + label.name);
        console.log(labelId + ' Test3');
        task.labels.push(label);
        console.log(label);
        label = await labelRepo.save(label);
      } catch (error) {
        res.status(404).send({
          status: 'not_found' + labelId + 'label',
        });
      }
    }
  } catch (error) {
    res.status(404).send({
      status: 'not_found' + taskId + 'task',
    });
  }
};
