// require the packages needed for the api

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const PORT = process.env.PORT;
const { Pool } = require("pg");
require("dotenv").config();

// create an instance of express
const app = express();
app.use(cors());
app.use(helmet());

// variable for the database URL
const dbURL = process.env.dbURL;

// create instance of pool

const pool = new Pool({
  host: 
  user: "database-user",
});


app.get("/", (req, res) => {
  res.send({ message: "Hi John" });
});

app.listen(PORT, () => {
  console.log("listening on port 3001");
});
