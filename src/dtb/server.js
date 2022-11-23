const mongoose = require("mongoose");
const joi = require('joi');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.listen(3000, () => console.log('Listening on port 3000...'));

mongoose
    .connect("mongodb://localhost:27017/companyCars_dtb", { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB!"))
    .catch(error => console.error("Could not connect to MongoDB... ", error));

const carSchema = new mongoose.Schema({
    driver: String,
    car: String,
    SPZ: String,
    startDrive: Date,
    endDrive: Date
});

const Car = mongoose.model("TripSheet", carSchema);

app.get('/cars', (req, res) => {
    Car.find().then(cars => {res.json(cars)})
})

app.get('/cars/:id', (req, res) => {
    const id = String(req.params.id);
    Car.findById(id, (err, result) => {
        if (err || !result){
            res.status(404).send('Car not found');
        } else {
            res.json(result);
        }
    })
})