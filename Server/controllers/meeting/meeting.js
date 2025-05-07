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

const deleteData = async (req, res) => {};

const deleteMany = async (req, res) => {};

module.exports = { add, index, view, deleteData, deleteMany };
