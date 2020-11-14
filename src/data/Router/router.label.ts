import {Router} from 'express';
import {
  createLabel,
  deleteLabelById,
  getAllLabels,
  getAllTasksByLabelId,
  getLabelById,
  updateLabelById,
} from '../Controller/controller.label';

// eslint-disable-next-line new-cap
export const labelRouter = Router({mergeParams: true});

/**
 * Folgend sind alle Routen aufgeführt, die ein Label hat
 */
labelRouter.delete('/:labelId', deleteLabelById);

labelRouter.get('/', getAllLabels);

labelRouter.get('/:labelId', getLabelById);

labelRouter.get('/task/:labelId', getAllTasksByLabelId);

labelRouter.patch('/:labelId', updateLabelById);

labelRouter.post('/', createLabel);


