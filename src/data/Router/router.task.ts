import {Router} from 'express';
import {
  addLabels,
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from '../Controller/controller.task';

export const taskRouter = Router({mergeParams: true});

taskRouter.get('/', getAllTasks);

taskRouter.post('/', createTask);

taskRouter.get('/:taskId', getTaskById);

taskRouter.delete('/:taskId', deleteTaskById);

taskRouter.patch('/:taskId', updateTaskById);

taskRouter.post('/label/:taskId', addLabels);

