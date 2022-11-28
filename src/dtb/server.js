const mongoose = require("mongoose");
const joi = require('joi');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.listen(3000, () => console.log('Listening on port 3000...'));

mongoose
    .connect("mongodb://127.0.0.1:27017/companyCars_dtb", { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB!"))
    .catch(error => console.error("Could not connect to MongoDB... ", error));

const carSchema = new mongoose.Schema({
    id: Number,
    driver: String,
    car: String,
    SPZ: String,
    startDrive: Date,
    endDrive: Date
});


const Car = mongoose.model("cars", carSchema);
const TripSheets = mongoose.model("tripsheets", carSchema);

/*car1 = new TripSheets({
    id: 0,
    driver: 'Pavel Novák',
    car: 'Ford Focus',
    SPZ: '2T4 5463',
    startDrive: new Date('2022-11-12'),
    endDrive: new Date('2022-11-12'),
})

car2 = new TripSheets({
    id: 1,
    driver: 'Martin Veselý',
    car: 'Škoda Rapid',
    SPZ: '9B8 7541',
    startDrive: new Date('2022-11-13'),
    endDrive: new Date('2022-11-15'),
})

car1.save()
car2.save()*/

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

app.get('/tripsheets', (req, res) => {
    TripSheets.find().then(records => {res.json(records)})
})

app.get('/tripsheets/:id', (req, res) => {
    const id = req.params.id;
    TripSheets.find({id: id}, (err, result) => {
        if (err || !result || result.length === 0){
            res.status(404).send('Car not found');
        } else {
            res.json(result);
        }
    })
});

app.delete('/tripsheets/:id', (req, res) => {
    TripSheets.findByIdAndDelete(req.params.id)
        .then(result => {
            if (result)
                res.json(result);
            else
                res.status(404).send("Record not found");
        })
        .catch(err => { res.send("errorek") });
});
