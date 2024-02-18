//var createError = require('http-errors');
const express = require('express');
const port = process.env.PORT || 3001;
const path = require('path');
const cookieParser = require('cookie-parser');
//const userController = require("../../om-backend/officemate-backend/controllers/Users/user_controller");
//const noteController = require("../../om-backend/officemate-backend/controllers/Notes/note_controller");
//const jwt = require("jsonwebtoken");
const logger = require('morgan');
const cors = require("cors");
const multer = require("multer");
//const usersRouter = require(path.resolve(__dirname, './routes/users'));
//const mongoClient = require("../officemate-backend/client/mongo");


const securityMiddleware = require("../officemate-backend/middlewares/security");
const { connectDB } = require("../../om-backend/officemate-backend/client/mongo");
const { userInfo } = require('os');

require("dotenv").config();
require("./routes/index");

// const indexRouter = require("./routes/index");
const usersRouter = require("./routes/Users/user_routes");
//const notesRouter = require("./routes/Notes/note_routes");
// const { constants } = require('buffer');
//const { connect } = require('http2');

//connectDB();
connectDB().catch(console.error);
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true, // This is important for cookies or auth headers
};

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
//app.use(cors());

app.use(securityMiddleware.checkJWT);

const notesRouter = require("../officemate-backend/routes/Notes/note_routes");
const eventsRouter = require("../officemate-backend/routes/event/event_routes");
const converterRouter = require("../officemate-backend/routes/converter/converter_routes");

app.use("/users", usersRouter);
app.use("/notes", notesRouter);
app.use("event", eventsRouter);
app. use("converter", converterRouter);


//User Routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.post("/signup", user_controller.signup);
// app.post("/login", user_controller.login);
// app.post("/user", user_controller.createUser);
// app.get("/user", user_controller.getAllUsers);
// app.delete("/user/delete/:id", user_controller.deleteUser);
// app.put("/user/update/:id", user_controller.updateUserPassword);

// // Note Routes
// app.post("/notes/create", note_controller.createNote);
// app.get("/notes", note_controller.getAllNotes);
// app.get("/notes/:id", note_controller.getNoteById);
// app.delete("/notes/:id", note_controller.deleteNote);
// app.put("/notes/update/:id", note_controller.updateNote);
// app.put("/notes/task/update/:id", note_controller.updateNoteTasks);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//mongoClient.init();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
