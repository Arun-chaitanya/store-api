const connectDB = require("./db/connect");
require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

const products = require("./routes/products");

//routes

app.get("/", (req, res) => {
  return res.send(
    '<h1>Store API</h1><a href="/api/v1/products">Products Route</a>'
  );
});

app.use("/api/v1/products", products);

app.use(errorHandlerMiddleware);

app.use(notFound);

//start server and connect db

const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDB(mongoURL);
    app.listen(port, () => {
      console.log(`Server has started at port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
