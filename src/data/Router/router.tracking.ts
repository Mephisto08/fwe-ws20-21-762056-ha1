import {Router} from 'express';
import {
  createTracking,
  deleteTrackingById,
  getAllTrackings,
  getTrackingById,
  UpdateTrackingById,
} from '../Controller/controller.tracking';

export const transactionRouter = Router({mergeParams: true});

transactionRouter.get('/', getAllTrackings);

transactionRouter.post('/', getTrackingById);

transactionRouter.get('/:transactionId', createTracking);

transactionRouter.delete('/:transactionId', UpdateTrackingById);

transactionRouter.patch('/:transactionId', deleteTrackingById);

