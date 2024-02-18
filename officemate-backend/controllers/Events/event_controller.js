const { eventCollection } = require("../../client/mongo");
//const { ObjectId } = require('mongodb');

exports.createEvent = async (req, res) => {
  const { title, description, startTime, endTime } = req.body;
  try {
    const newEvent = await eventCollection.insertOne({ title, description, startTime, endTime });
    res.status(201).json({ message: "Event created successfully", eventId: newEvent.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params; // Assuming you're using the id in the URL to identify the event
  try {
    const result = await eventCollection.deleteOne({ _id: id });
    //const result = await eventCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Example: Fetching all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventCollection.find().toArray();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Example: Fetching a single event by ID
exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await eventCollection.findOne({ _id: id });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
