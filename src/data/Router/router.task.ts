import {Router} from 'express';
import {
  // addLabels,
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from '../Controller/controller.task';

// eslint-disable-next-line new-cap
export const taskRouter = Router({mergeParams: true});

taskRouter.delete('/:taskId', deleteTaskById);

taskRouter.get('/', getAllTasks);

taskRouter.get('/:taskId', getTaskById);

taskRouter.patch('/:taskId', updateTaskById);

taskRouter.post('/', createTask);

// taskRouter.post('/label/:taskId', addLabels);

