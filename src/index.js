const express = require("express");
const cors = require("cors");
const path = require("path");
const glob = require("glob");
//require("dotenv").config();
//const morgan = require("morgan");
const mongoose = require('mongoose');


const IndexRouter = require('./routers/index');

const app = express();
//app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

// View Engine Setup
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/', IndexRouter);

app.use(express.json());
app.use(cors());

let initRoutes = () => {
  // including all routes
  glob("./Routes/*.js", { cwd: path.resolve("./src") }, (err, routes) => {
    if (err) {
      console.log("Error occured including routes");
      return;
    }
    routes.forEach((routePath) => {
      require(routePath).getRouter(app); // eslint-disable-line
    });
  });
};

initRoutes(app);



mongoose.connect(
  "mongodb://localhost/buzz",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  },
  (error) => {
    if (error) throw error;
    else console.log("Database Connected.");
  }
);

const port = 3010;
app.listen(port);
console.log("Started on port " + port);
