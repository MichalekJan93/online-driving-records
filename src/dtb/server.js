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
    driver: String,
    car: String,
    SPZ: String,
    startDrive: Date,
    endDrive: Date
});

const driverSchema = new mongoose.Schema({
    name: String,
    sureName: String,
})


const Car = mongoose.model("cars", carSchema);
const TripSheets = mongoose.model("tripsheets", carSchema);
const Driver = mongoose.model("drivers", driverSchema);

/*car1 = new Driver({
    name: 'Pavel',
    sureName: 'Novák'
})

car2 = new Driver({
    name: 'Martin',
    sureName: 'Veselý'
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

app.get('/drivers', (req, res) => {
    Driver.find().then(cars => {res.json(cars)})
})
