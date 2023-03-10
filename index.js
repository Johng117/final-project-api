// require the packages needed for the api
const express = require("express");
const path = require("path");
const cors = require("cors");
const https = require("https")
const fs = require("fs");
const helmet = require("helmet");
const PORT = process.env.PORT || 3001;
const { Pool } = require("pg");
require("dotenv").config();

// create an instance of express
const app = express();
app.use(cors());
app.use(helmet());

// ssl certificate config
const key = fs.readFileSync(__dirname + )
const cert = fs.readFileSync(__dirname + )
const options = {
  key: key,
  cert: cert
};


//
// app.use(express.static(path.join(__dirname, "build")));

// if (process.env.NODE_ENV === "production") {
//   app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   });
// }

// create instance of pool with config credentials
const pool = new Pool({
  database: process.env.DATABASE,
  host: process.env.HOST,
  user: process.env.USER,
  port: 5432,
  password: process.env.PASSWORD,
});

// test endpoint
app.get("/", (req, res) => {
  res.send({ message: "Hi John" });
});

// endpoint to get one random quote from quotes table in database
app.get("/quote", (req, res) => {
  const randomQuoteNumber = Math.ceil(Math.random() * (1640 - 1) + 1);
  const quoteQuery = `SELECT quote_text,quote_author FROM quotes WHERE quote_id=$1`;
  pool
    .query(quoteQuery, [randomQuoteNumber])
    .then((result) => res.json(result.rows))
    .catch((error) => res.status(500).json(error));
});

const server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log("listening on port 3001");
});
