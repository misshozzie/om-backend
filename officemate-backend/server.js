const express = require("express");
const createError = require("http-errors");
const port = process.env.PORT || 5173;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
const securityMiddleware = require("./middlewares/security");
const connectDB = require("./client/mongo")
require("dotenv").config();
require("./routes/index");
//const { userInfo } = require("os");

const usersRouter = require("./routes/user_routes");
const notesRouter = require("./routes/note_routes");
const tasksRouter = require("./routes/task_routes");    
const eventsRouter = require("./routes/event_routes");
//const authRoutes = require("./routes/auth.routes");


connectDB();
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors({ origin: "http://localhost:5173" }));

/*=== MIDDLEWARE === */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(securityMiddleware.checkJWT);

/*=== ROUTES === */
app.use("/users", usersRouter);
app.use("/notes", notesRouter);
app.use("/tasks", tasksRouter);
app.use("/events", eventsRouter);
//app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Server running`);
})

module.exports = app;

