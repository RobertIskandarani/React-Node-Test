const Meetings = require('../../model/schema/meeting');
const mongoose = require('mongoose');

const add = async (req, res) => {
  try {
    const {
      agenda,
      location,
      dateTime,
      notes,
      related,
      createBy,
      attendes,
      attendesLead,
    } = req.body;
    const meeting = new Meetings({
      agenda,
      location,
      dateTime,
      notes,
      related,
      createBy,
      attendes,
      attendesLead,
    });
    await meeting.save();
    res.status(200).json({ message: 'Meeting created successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const index = async (req, res) => {
  try {
    const meetings = await Meetings.find({ deleted: false });
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const view = async (req, res) => {};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meetings.findByIdAndUpdate(id, { deleted: true });
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteMany = async (req, res) => {
  try {
    const { meetingIds } = req.body; // Assuming req.body is an array of meeting IDs
    const updatedMeetings = await Meetings.updateMany(
      { _id: { $in: meetingIds } },
      { $set: { deleted: true } }
    );

    res.status(200).json({ message: 'done', updatedMeetings });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { add, index, view, deleteData, deleteMany };
