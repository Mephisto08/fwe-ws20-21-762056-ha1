import {getRepository} from 'typeorm';
import {Label} from '../Entities/Label';
import {Task} from '../Entities/Task';
import Axios from 'axios';

/**
 * Fügt ein Task eine Label zu.
 * Erwartet als Parameter eine Task Id.
 * Erwartet im Body eine labelList. Diese beinhaltet eine Liste mit Label Ids.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const addLabelsByTaskId = async (req, res) =>{
  type NewType = number;
  const taskId = req.params.taskId;
  const {labelList} = req.body;

  if (!checkAllElementsSet) {
    res.status(400).send({
      status: 'Error: Not all parameters were set.',
    });
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
        status: 'Error: ' + error,
      });
    }
  }
};

/**
 * Prüft ob alle Elemente gesetzt wurden, wenn ein Task erstellt werden soll.
 * @param {number}taskId Id einer Task
 * @param {list}labelList Liste mit Labels
 * @return {boolean} True wenn alle Parameter gesetzt wurden.
 */
function checkAllElementsSet(taskId, labelList) {
  if (taskId === undefined || labelList === undefined) {
    return false;
  }
  return true;
};

/**
 * Erstellt einen Task.
 * Erwartet als Parameter nichts.
 * Erwartet im Body einen name und eine description.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const createTask = async (req, res) => {
  const {name, description} = req.body;

  const task = new Task();
  task.name = name;
  task.description = description;

  const taskRepository = getRepository(Task);
  try {
    const createdTask = await taskRepository.save(task);

    res.status(200).send({
      data: createdTask,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Löscht aus einem Task labels heraus. Task wird mit seiner Id selektiert.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body eine labelList. Diese beinhaltet eine Liste mit Label Ids.
 * @param {Request}req Request
 * @param {Response}res Response
 */
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

/**
 * Löscht einen Task. Task wird mit seiner Id selektiert.
 * Löscht auch seine dazugehörigen Trackings mit.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
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

/**
 * Gibt alle Labels eines Task wieder. Task wird anhand seiner Id selektiert.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
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

/**
 * Gibt alle Task zurück.
 * Erwartet als Parameter nichts.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getAllTasks = async (req, res) => {
  const taskRepository = getRepository(Task);
  try {
    const tasks = await taskRepository.find(
        {relations: ['trackings', 'labels']});
    res.status(200).send({data: tasks});
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Gibt alle Trackings eines Task wieder. Task wird anhand seiner Id selektiert.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
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

/**
 * Gibt einen Task anhand seiner Id zurück.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
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

/**
 * Updatet ein Task anhand seiner Id.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body mindesten einen der zwei Parameter:
 * name, description
 * @param {Request}req Request
 * @param {Response}res Response
 */
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

/**
 * Sendet einen Task an Slack Channel. Task wird anhand seiner Id selektiert.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
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
    await Axios.post(`https://hooks.slack.com/services/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`, {
      text: `!!! Task wurde nicht gefunden oder Fehler bei der Übertragung !!!`,
    });
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Sendet alle Task an Slack Channel.
 * Erwartet als Parameter nichts.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const sendSlackAll = async (req, res) => {
  const taskRepository = getRepository(Task);

  try {
    const task = await taskRepository.find(
        {relations: ['trackings', 'labels']});
    let allTasks: string = ``;
    for (let i = 0; i < task.length; ++i) {
      allTasks +=
      ` Task Id: ${task[i].id}:
       Name:         ${task[i].name} 
       Beschr:       ${task[i].description}
       Erzeugt:      ${task[i].created}
       Update:       ${task[i].updated}
      \n`;
    }
    if (task.length === 0) {
      await Axios.post(`https://hooks.slack.com/services/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`, {
        text: `!!! Keine Task in der Datenbank !!!`,
      });
    } else {
      await Axios.post(`https://hooks.slack.com/services/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`, {
        text: `Tasks: \n${allTasks}`,
      });
    }
    res.status(200).send({
      data: task,
    });
  } catch (error) {
    await Axios.post(`https://hooks.slack.com/services/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`, {
      text: `!!! Fehler bei der Übertragung !!!`,
    });
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

