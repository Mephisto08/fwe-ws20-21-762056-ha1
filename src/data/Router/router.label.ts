import {Router} from 'express';
import {
  createLabel,
  deleteLabelById,
  getAllLabels,
  getLabelById,
  updateLabelById,
} from '../Controller/controller.label';

// eslint-disable-next-line new-cap
export const labelRouter = Router({mergeParams: true});

labelRouter.delete('/:labelId', deleteLabelById);

labelRouter.get('/', getAllLabels);

labelRouter.get('/:labelId', getLabelById);

labelRouter.patch('/:labelId', updateLabelById);

labelRouter.post('/', createLabel);


