const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const db = require("./db");
const dishesRouter = require("./routes/dishRoutes");
const userRouter = require('./routes/userRoutes');
const bodyParser = require("body-parser");

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.set("jwtkey", process.env.JWT_KEY);
app.use(cors());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE,PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Api-Key",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization"
  );
  next();
});

app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const DB = process.env.DATABASE;
/* mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("Db connection successfull!");
  }); */

db.connect();

//3)routes
app.use("/api/v1/dishes", dishesRouter);
app.use('/api/v1/users',userRouter);

//4) start server
const port = 3001;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
