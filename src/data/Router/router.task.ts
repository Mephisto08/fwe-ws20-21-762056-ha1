import {Router} from 'express';
import {
  createTask,
  deleteTaksByID,
  getAllTasks,
  getTaskByID,
  UpdateTaskById,
} from '../Controller/controller.task';

export const taskRouter = Router({mergeParams: true});

taskRouter.get('/', getAllTasks);

taskRouter.post('/', createTask);

taskRouter.get('/:taskId', getTaskByID);

taskRouter.delete('/:taskId', deleteTaksByID);

taskRouter.patch('/:taskId', UpdateTaskById);
