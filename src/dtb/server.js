const mongoose = require("mongoose");
const joi = require('joi');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.listen(3000, () => console.log('Listening on port 3000...'));

mongoose
    .connect("mongodb://localhost:27017/cars", { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB!"))
    .catch(error => console.error("Could not connect to MongoDB... ", error));

const carSchema = new mongoose.Schema({
    name: String,
    SPZ: String,
});

const Car = mongoose.model("Car", carSchema);


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