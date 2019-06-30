const port = 5000;
const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://Tintin:Tintin1114@midterm-jwfhd.mongodb.net/test?retryWrites=true&w=majority";
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require('express');
const logger = require('morgan');


const ItemSchema = require('./ItemSchema');

const app = express();
const router = express.Router();
app.use(cors());
mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true }
);
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
router.get("/getItem", (req, res) => {
  ItemSchema.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.post("/updateItem", (req, res) => {
  const { productName, update } = req.body;
  ItemSchema.findOneAndUpdate(productName, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
router.delete("/deleteItem", (req, res) => {
  const { productName } = req.body;
  ItemSchema.findOneAndDelete(productName, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});
router.post("/insertItem", (req, res) => {
  let item = new ItemSchema();
  const { productName,price } = req.body;

  if (!productName) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  item.productName = productName;
  item.price = price;
  item.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
app.use("/backend", router);
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));