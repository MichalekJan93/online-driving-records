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
    name: String,
    SPZ: String,
});

const Car = mongoose.model("Car", carSchema);

const car1 = new Car({
    name : 'Škoda Superb IV',
    SPZ : '5A6 9787'
})

const car2 = new Car({
    name : 'Renault Clio',
    SPZ : '3T4 2321'
})

const car3 = new Car({
    name : 'Škoda Rapid',
    SPZ : '9B8 7541'
})

const car4 = new Car({
    name : 'Ford Focus',
    SPZ : '2T4 5463'
})

car1.save()
car2.save()
car3.save()
car4.save()

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