require("dotenv").config();

//importing the modules here in server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");
const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@trackexpenses.rdrqjb4.mongodb.net/?retryWrites=true&w=majority`;

// const helmet = require("helmet");
const morgan = require("morgan");

//importing routes
const userRoute = require("./routes/user");
const premiumRoute = require("./routes/premiumRoute");
const welcome = require("./routes/welcome");


//instantiating the application
const app = express();
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
// calling helmet, cors, json, making absolute path for static files
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(express.static("public"));
app.use(morgan("combined", { stream: accessLogStream }));



//defining the route 
app.use('/user', userRoute);
app.use("/premium", premiumRoute);
app.use(welcome);



// making the port for server to listen
const port = process.env.PORT || 3000;

// listening on port
async function initiate() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
initiate();
