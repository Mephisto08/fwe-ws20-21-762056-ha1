import {Router} from 'express';
import {
  createTask,
  deleteTaksById,
  getAllTasks,
  getTaskById,
  UpdateTaskById,
} from '../Controller/controller.task';

export const taskRouter = Router({mergeParams: true});

taskRouter.get('/', getAllTasks);

taskRouter.post('/', createTask);

taskRouter.get('/:taskId', getTaskById);

taskRouter.delete('/:taskId', deleteTaksById);

taskRouter.patch('/:taskId', UpdateTaskById);

// taskRouter.post('/:taskId/label', addLabels);
