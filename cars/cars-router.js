const express = require('express');

const router = express.Router();

const db = require('./carsDB.js');

router.get('/', (req,res) => {
    db.get()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => {
            res.status(500).json({error: "Information could not be retrieved"})
        })
})

router.post('/', validateCar, (req,res) => {

    const newCar = req.body;

    db.insert(newCar)
        .then(car => {
            res.status(201).json(car)
          })
          .catch(err => {
            res.status(500).json({ error: "There was an error while saving the car to the database" });
          })
})

function validateCar(req, res, next) {
    const carData = req.body;
    if(!carData) {
      res.status(400).json({ message: "missing car data" });
    } else if (!carData.make || !carData.model || !carData.mileage || !carData.VIN) {
      res.status(400).json({ message: 'missing required field'})
    } else {
      next();
    }
  }

  module.exports = router;