import {Router} from 'express';
import {
  createTracking,
  deleteTrackingById,
  getAllTrackings,
  getTrackingById,
  UpdateTrackingById,
} from '../Controller/controller.tracking';

export const trackingRouter = Router({mergeParams: true});

trackingRouter.get('/', getAllTrackings);

trackingRouter.post('/', getTrackingById);

trackingRouter.get('/:trackingId', createTracking);

trackingRouter.delete('/:trackingId', UpdateTrackingById);

trackingRouter.patch('/:trackingId', deleteTrackingById);

