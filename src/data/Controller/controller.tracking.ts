import {getRepository} from 'typeorm';
import {Tracking} from '../Entities/Tracking';

export const createTracking = async (req, res) => {
  const {name} = req.body;

  const tracking = new Tracking();
  tracking.name = name;

  const trackingRepository = await getRepository(Tracking);
  const createdTracking = await trackingRepository.save(tracking);

  res.send({
    data: createdTracking,
  });
};

export const deleteTrackingById = async (req, res) => {
  const trackingId = req.params.trackingId;
  const trackingRepository = getRepository(Tracking);

  try {
    const tracking = await trackingRepository.findOneOrFail(trackingId);
    await trackingRepository.remove(tracking);
    res.send({});
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

export const getAllTrackings = async (req, res) => {
  const trackingRepository = getRepository(Tracking);
  const trackings = await trackingRepository.find();
  res.send({data: trackings});
};

export const getTrackingById = async (req, res) => {
  const trackingId = req.params.trackingId;
  const trackingRepository = getRepository(Tracking);

  try {
    const tracking = await trackingRepository.findOneOrFail(trackingId);
    res.send({
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

    res.send({
      data: tracking,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};
