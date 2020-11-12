import {getRepository} from 'typeorm';
import {Label} from '../Entities/Label';

export const createLabel = async (req, res) => {
  const {name} = req.body;

  if (name === undefined) {
    res.status(400).send({
      status: 'Error: Not all parameters were set.',
    });
  } else {
    try {
      const label = new Label();
      label.name = name;

      const labelRepository = getRepository(Label);
      const createdlabel = await labelRepository.save(label);

      res.status(200).send({
        data: createdlabel,
      });
    } catch (error) {
      res.status(404).send({
        status: 'Error: ' + error,
      });
    }
  }
};

export const deleteLabelById = async (req, res) => {
  const labelId = req.params.labelId;
  const labelRepository = getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    await labelRepository.remove(label);
    res.status(200).send({});
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

export const getAllTasksByLabelId = async (req, res) => {
  const labelId = req.params.labelId;
  const labelRepo = getRepository(Label);
  try {
    const label = await labelRepo.findOneOrFail(labelId);
    const labelTaskList = await label.tasks;
    res.status(200).send({data: labelTaskList});
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

export const getLabelById = async (req, res) => {
  const labelId = req.params.labelId;
  const labelRepository = getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    res.status(200).send({
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
  const {name} = req.body;
  const labelRepository = getRepository(Label);

  try {
    let label = await labelRepository.findOneOrFail(labelId);
    label.name = name;

    label = await labelRepository.save(label);

    res.status(200).send({
      data: label,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};
