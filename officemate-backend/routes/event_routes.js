const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event_controller");
const securityMiddleware = require("../middlewares/security");

/* === ROUTE GET ALL EVENTS === */
router.get(
  "/:eventid",
  securityMiddleware.checkJWT,
  eventController.getAllEvents
)

/* === ROUTE DELETE EVENTS === */
router.delete(
  "/:eventid",
  securityMiddleware.checkJWT,
  eventController.deleteEvent
);


/* === ROUTE NEW EVENTS === */
router.post("/events", securityMiddleware.checkJWT, eventController.newEvent);

module.exports = router;
