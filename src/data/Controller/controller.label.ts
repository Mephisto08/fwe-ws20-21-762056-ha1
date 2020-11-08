import {getRepository} from 'typeorm';
import {Label} from '../Entities/Label';

export const createLabel = async (req, res) => {
  try {
    const {name} = req.body;

    const label = new Label();
    label.name = name;

    const labelRepository = getRepository(Label);
    const createdlabel = await labelRepository.save(label);

    res.send({
      data: createdlabel,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
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
      status: 'Error: ' + error,
    });
  }
};

export const getAllLabels = async (req, res) => {
  const labelRepository = getRepository(Label);
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
      status: 'Error: ' + error,
    });
  }
};

export const updateLabelById = async (req, res) => {
  const labelId = req.params.labelId;
  const name = req.body;
  const labelRepository = await getRepository(Label);

  try {
    let label = await labelRepository.findOneOrFail(labelId);
    label.name = name;

    label = await labelRepository.save(label);

    res.send({
      data: label,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};
