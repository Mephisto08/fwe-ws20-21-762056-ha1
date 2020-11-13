import {Router} from 'express';
import {
  addLabelsByTaskId,
  createTask,
  deleteLabelsByTaskId,
  deleteTaskById,
  getAllTasks,
  getAllTrackingsByTaskId,
  getTaskById,
  getAllLabesByTaskId,
  updateTaskById,
  sendSlackByTaskId,
  sendSlackAll,
} from '../Controller/controller.task';

// eslint-disable-next-line new-cap
export const taskRouter = Router({mergeParams: true});

taskRouter.delete('/:taskId', deleteTaskById);

taskRouter.delete('/label/:taskId', deleteLabelsByTaskId);

taskRouter.get('/', getAllTasks);

taskRouter.get('/:taskId', getTaskById);

taskRouter.get('/label/:taskId', getAllLabesByTaskId);

taskRouter.get('/tracking/:taskId', getAllTrackingsByTaskId);

taskRouter.patch('/:taskId', updateTaskById);

taskRouter.post('/', createTask);

taskRouter.post('/label/:taskId', addLabelsByTaskId);

taskRouter.post('/slack/:taskId', sendSlackByTaskId);

taskRouter.post('/slack', sendSlackAll);


