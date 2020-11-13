import {getRepository} from 'typeorm';
import {Label} from '../Entities/Label';
import {Task} from '../Entities/Task';
import Axios from 'axios';
export const addLabelsByTaskId = async (req, res) =>{
  type NewType = number;
  const taskId = req.params.taskId;
  const {labelList} = req.body;

  if (taskId === undefined || labelList === undefined) {
    res.status(400).send({
      status: 'Error: Not all parameters were set.',
    });
  } else {
    const taskRepo = getRepository(Task);

    try {
      const task = await taskRepo.findOneOrFail(taskId);
      const taskLabelsList = await task.labels;
      const labelRepo = getRepository(Label);

      for (let i = 0; i < Object.keys(labelList).length; ++i) {
        const labelId: NewType = labelList[i];
        const label = await labelRepo.findOneOrFail(labelId);
        taskLabelsList.push(label);
        await taskRepo.save(task);
      }
      res.status(200).send({
        data: task,
      });
    } catch (error) {
      res.status(404).send({
        status: 'Error: ' + error + taskId + 'task',
      });
    }
  }
};

export const createTask = async (req, res) => {
  const {name, description} = req.body;

  const task = new Task();
  task.name = name;
  task.description = description;

  const taskRepository = getRepository(Task);
  const createdTask = await taskRepository.save(task);

  res.status(200).send({
    data: createdTask,
  });
};

export const deleteLabelsByTaskId = async (req, res) =>{
  const taskId = req.params.taskId;
  const {labelList} = req.body;
  const taskRepo = getRepository(Task);

  try {
    const task = await taskRepo.findOneOrFail(taskId);
    let taskLabelsList = await task.labels;

    taskLabelsList = taskLabelsList.filter((label) =>
      !labelList.includes(label.id));

    task.labels = Promise.resolve(taskLabelsList);

    await taskRepo.save(task);
    res.status(200).send({
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
    res.status(200).send({});
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

export const getAllLabesByTaskId = async (req, res) => {
  const taskId = req.params.taskId;
  const taskRepo = getRepository(Task);
  try {
    const task = await taskRepo.findOneOrFail(taskId);
    const taskLabelsList = await task.labels;
    res.status(200).send({data: taskLabelsList});
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

export const getAllTasks = async (req, res) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find(
      {relations: ['trackings', 'labels']});
  res.status(200).send({data: tasks});
};

export const getAllTrackingsByTaskId = async (req, res) =>{
  const taskId = req.params.taskId;
  const taskRepo = getRepository(Task);
  try {
    const task = await taskRepo.findOneOrFail(taskId);
    const taskTrackingsList = await task.trackings;
    res.status(200).send({data: taskTrackingsList});
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

export const getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  const taskRepository = getRepository(Task);

  try {
    const task =
    await taskRepository.findOneOrFail(taskId,
        {relations: ['trackings', 'labels']});
    res.status(200).send({
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
    let task =
    await taskRepository.findOneOrFail(taskId,
        {relations: ['trackings', 'labels']});
    task.name = name;
    task.description = description;

    task = await taskRepository.save(task);

    res.status(200).send({
      data: task,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

export const sendSlackByTaskId = async (req, res) => {
  const taskId = req.params.taskId;
  const taskRepository = getRepository(Task);

  try {
    const task =
    await taskRepository.findOneOrFail(taskId,
        {relations: ['trackings', 'labels']});
    await Axios.post(`https://hooks.slack.com/services/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`, {
      text: `Task ${task.id}:
             Name:         ${task.name} 
             Beschr:       ${task.description}
             Erzeugt:      ${task.created}
             Update:       ${task.updated}
             `,
    });
    res.status(200).send({
      data: task,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};


export const sendSlackAll = async (req, res) => {
  const taskRepository = getRepository(Task);

  try {
    const task = await taskRepository.find(
        {relations: ['trackings', 'labels']});
    let stri: string;
    for (let i = 0; i < task.length; ++i) {
      stri +=
      `Task: ${task[i].id}:
       Name:         ${task[i].name} 
       Beschr:       ${task[i].description}
       Erzeugt:      ${task[i].created}
       Update:       ${task[i].updated}
      `;
    }
    console.log(stri);
    await Axios.post(`https://hooks.slack.com/services/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`, {
      text: `Tasks:
             ${stri}`,
    });
    res.status(200).send({
      data: task,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

