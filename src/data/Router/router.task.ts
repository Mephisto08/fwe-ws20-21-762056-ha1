import {Router} from 'express';
import {
  addLabelsByTaskId,
  deleteLabelsByTaskId,
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from '../Controller/controller.task';

// eslint-disable-next-line new-cap
export const taskRouter = Router({mergeParams: true});

taskRouter.delete('/:taskId', deleteTaskById);

taskRouter.delete('/label/:taskId', deleteLabelsByTaskId);

taskRouter.get('/', getAllTasks);

taskRouter.get('/:taskId', getTaskById);

taskRouter.patch('/:taskId', updateTaskById);

taskRouter.post('/', createTask);

taskRouter.post('/label/:taskId', addLabelsByTaskId);

