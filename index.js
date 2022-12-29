// require the packages needed for the api
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const PORT = process.env.PORT || 3001;
const { Pool } = require("pg");
require("dotenv").config();

// create an instance of express
const app = express();
app.use(cors());
app.use(helmet());

// create instance of pool with config credentials
const pool = new Pool({
  database: process.env.DATABASE,
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
});

// test endpoint
app.get("/", (req, res) => {
  res.send({ message: "Hi John" });
});

// endpoint to get one random quote from quotes table in database
app.get("/quote", (req, res) => {
  const randomQuoteNumber = Math.ceil(Math.random() * (1640-1)+1);
  const quoteQuery = `SELECT $1,$2 FROM quotes WHERE id=$3`
  pool
    .query(quoteQuery, [text, author, randomQuoteNumber])
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

app.listen(PORT, () => {
  console.log("listening on port 3001");
});
