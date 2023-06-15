const connectDB = require("./db/connect");

require("dotenv").config();

const ProductModel = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await ProductModel.deleteMany();
    await ProductModel.create(jsonProducts);
    console.log("success");
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

start();
