import {getRepository} from 'typeorm';
import {Label} from '../Entities/Label';

export const getAllLabels = async (req, res) => {
  const labelRepository = await getRepository(Label);
  const labels = await labelRepository.find();
  res.send({data: labels});
};

export const getLabelById = async (req, res) => {
  const labelId = req.params.labelId;
  const labelRepository = getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    res.send({
      data: label,
    });
  } catch (error) {
    res.status(404).send({
      status: 'not_found',
    });
  }
};

export const deleteLabelById = async (req, res) => {
  const labelId = req.params.labelId;
  const labelRepository = getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    await labelRepository.remove(label);
    res.send({});
  } catch (error) {
    res.status(404).send({
      status: 'not_found',
    });
  }
};

export const UpdateLabelById = async (req, res) => {
  const labelId = req.params.labelId;
  const name = req.body;
  const labelRepository = getRepository(Label);

  try {
    let label = await labelRepository.findOneOrFail(labelId);
    label.name = name;

    label = await labelRepository.save(label);

    res.send({
      data: label,
    });
  } catch (error) {
    res.status(404).send({
      status: 'not_found',
    });
  }
};

export const createLabel = async (req, res) => {
  const name = req.body;

  const label = new Label();
  label.name = name;

  const labelRepository = await getRepository(Label);
  const createdlabel = await labelRepository.save(label);

  res.send({
    data: createdlabel,
  });
};
