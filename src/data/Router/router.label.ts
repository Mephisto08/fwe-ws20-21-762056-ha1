import {Router} from 'express';
import {
  createLabel,
  deleteLabelById,
  getAllLabels,
  getLabelById,
  UpdateLabelById,
} from '../Controller/controller.label';

export const labelRouter = Router({mergeParams: true});

labelRouter.get('/', getAllLabels);

labelRouter.post('/', getLabelById);

labelRouter.get('/:labelId', createLabel);

labelRouter.delete('/:labelId', UpdateLabelById);

labelRouter.patch('/:labelId', deleteLabelById);
