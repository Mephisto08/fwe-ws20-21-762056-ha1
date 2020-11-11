import {getRepository} from 'typeorm';
import {Task} from '../Entities/Task';
import {Tracking} from '../Entities/Tracking';

export const createTracking = async (req, res) => {
  const {name} = req.body;
  const {task} = req.body;

  const tracking = new Tracking();
  const taskRepo = getRepository(Task);

  if (name === undefined || task === undefined) {
    res.status(400).send({
      status: 'Error: Not all parameters were set.',
    });
  } else {
    try {
      const taske = await taskRepo.findOneOrFail(task);

      tracking.name = name;
      tracking.task = taske;

      const trackingRepository = getRepository(Tracking);
      const createdTracking = await trackingRepository.save(tracking);

      res.status(200).send({
        data: createdTracking,
      });
    } catch (error) {
      res.status(404).send({
        status: 'Error: ' + error,
      });
    }
  }
};

export const deleteTrackingById = async (req, res) => {
  const trackingId = req.params.trackingId;
  const trackingRepository = getRepository(Tracking);

  try {
    const tracking = await trackingRepository.findOneOrFail(trackingId);
    await trackingRepository.remove(tracking);
    res.status(200).send({});
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

export const getAllTrackings = async (req, res) => {
  const trackingRepository = getRepository(Tracking);
  const trackings = await trackingRepository.find();
  res.status(200).send({data: trackings});
};

export const getTrackingById = async (req, res) => {
  const trackingId = req.params.trackingId;
  const trackingRepository = getRepository(Tracking);

  try {
    const tracking = await trackingRepository.findOneOrFail(trackingId);
    res.status(200).send({
      data: tracking,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

export const updateTrackingById = async (req, res) => {
  const trackingId = req.params.trackingId;
  const {name} = req.body;
  const trackingRepository = await getRepository(Tracking);

  try {
    let tracking = await trackingRepository.findOneOrFail(trackingId);
    tracking.name = name;

    tracking = await trackingRepository.save(tracking);

    res.status(200).send({
      data: tracking,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};
