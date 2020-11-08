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

labelRouter.post('/', createLabel);

labelRouter.get('/:labelId', getLabelById);

labelRouter.delete('/:labelId', deleteLabelById);

labelRouter.patch('/:labelId', UpdateLabelById);


