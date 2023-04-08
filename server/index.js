const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const user = require("./routes/user");
const channel = require("./routes/channels");
var dot = require("dotenv");
dot.config();
const app = express();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", function () {
  console.log("connected!!!");
});
mongoose.connection.on("error", function () {
  console.log("error connecting to mongoDB");
});
app.use(bodyParser.json());
app.set("trust proxy", 1);
app.use(
  require("express-session")({
    secret: "hello circuit",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Origin",
    "https://real-time-chat-app-three.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("home");
});
app.use("/auth", auth);
app.use("/users", user);
app.use("/channels", channel);

const server = app.listen(process.env.PORT || 3000, function () {
  console.log("running");
});

// const io = socket(server, {
//   cors: {
//     origin: "https://real-time-chat-app-three.vercel.app",
//     methods: ["GET", "PUT", "POST"],
//   },
// });

const io = new Server(server, {
  cors: {
    origin: ["https://real-time-chat-app-three.vercel.app"],
    allowedHeaders: [
      "X-Requested-With",
      "X-HTTP-Method-Override",
      "Content-Type",
      "Accept",
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  },
});

// const redis = require("redis");
// const { createAdapter } = require("@socket.io/redis-adapter");
// const pubClient = redis.createClient(
//   9809,
//   "ec2-54-243-181-172.compute-1.amazonaws.com",
//   {
//     auth_pass:
//       "p724cd67583f041245abe3090c6d995154d884cb21d496d0fa9d6b6e324af9325",
//   }
// );
// const subClient = pubClient.duplicate();
// io.adapter(createAdapter(pubClient, subClient));

io.on("connection", (socket) => {
  console.log("SERVER CONNECTION HAPPENED", socket);
  socket.on("registerAll", (channels) => {
    channels.forEach((channel) => {
      socket.join(channel._id);
    });
  });
  socket.on("register", (channel) => {
    socket.join(channel._id);
  });
  socket.on("messageSent", (channel) => {
    socket.to(channel._id).emit("messageReceived", channel);
  });
});
