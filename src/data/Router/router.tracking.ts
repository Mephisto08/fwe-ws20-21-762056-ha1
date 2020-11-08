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

trackingRouter.post('/', createTracking);

trackingRouter.get('/:trackingId', getTrackingById);

trackingRouter.delete('/:trackingId', deleteTrackingById);

trackingRouter.patch('/:trackingId', UpdateTrackingById);