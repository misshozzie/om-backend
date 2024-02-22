const express = require("express");
const eventController = require("../controllers/event_controller");
const router = express.Router();
const securityMiddleware = require("../middlewares/security");

// Event Routes
router.get('/', (req, res) => {
    res.send('User route is working');
app.post("/events", securityMiddleware.checkLogin, eventController.createEvent);
app.delete("/events/:id", securityMiddleware.checkLogin, eventController.deleteEvent);
});

module.exports = router;