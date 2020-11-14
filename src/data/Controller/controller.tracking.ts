
import {getRepository} from 'typeorm';
import {Task} from '../Entities/Task';
import {Tracking} from '../Entities/Tracking';

/**
 * Erstellt ein Tracking.
 * Erwartet als Parameter nichts.
 * Erwartet im Body eine Beschr. und eine Id von einem existierenden Task.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const createTracking = async (req, res) => {
  const {description} = req.body;
  const {task} = req.body;

  const tracking = new Tracking();
  const taskRepo = getRepository(Task);

  if (description === undefined || task === undefined) {
    res.status(400).send({
      status: 'Error: Not all parameters were set.',
    });
  } else {
    try {
      const taske =
      await taskRepo.findOneOrFail(task, {relations: ['trackings']});

      tracking.description = description;
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

/**
 * Löscht ein Tracking anhnd seiner Id.
 * Erwartet als Parameter eine trackingId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
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
/**
 * Gibt alle Trackings zurück.
 * Erwartet als Parameter nichts.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getAllTrackings = async (req, res) => {
  const trackingRepository = getRepository(Tracking);
  try {
    const tracking = await trackingRepository.find({relations: ['task']});
    res.status(200).send({
      data: tracking,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};
/**
 * Gibt ein Tracking anhanfd seiner Id zurück
 * Erwartet als Parameter eine trackingId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getTrackingById = async (req, res) => {
  const trackingId = req.params.trackingId;
  const trackingRepository = getRepository(Tracking);

  try {
    const tracking =
    await trackingRepository.findOneOrFail(trackingId, {relations: ['task']});
    res.status(200).send({
      data: tracking,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};
/**
 * Updatet ein Tracking anhand seiner Id.
 * Erwartet als Parameter eine trackingId.
 * Erwartet im Body mindesten einen der drei Parameter:
 * description, timeStart, timeEnd
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const updateTrackingById = async (req, res) => {
  const trackingId = req.params.trackingId;
  const {description} = req.body;
  const {timeStart} = req.body;
  const {timeEnd} = req.body;
  const trackingRepo = getRepository(Tracking);

  try {
    let tracking =
    await trackingRepo.findOneOrFail(trackingId);
    tracking.description = description;
    tracking.timeStart = timeStart;
    tracking.timeEnd = timeEnd;

    tracking = await trackingRepo.save(tracking);

    res.status(200).send({
      data: tracking,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};
