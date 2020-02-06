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
});

router.post('/', validateCar, (req,res) => {

    const newCar = req.body;

    db.insert(newCar)
        .then(car => {
            res.status(201).json(car)
          })
          .catch(err => {
            res.status(500).json({ error: "There was an error while saving the car to the database" });
          })
});

router.delete('/:id', validateCarId, (req, res) => {

    db.remove(req.params.id)
      .then(car => {
        res.status(200).json(car);
      })
      .catch(err => {
        res.status(500).json({error: "The car could not be removed"});
      })
});

router.put('/:id', validateCarId, validateCar, (req, res) => {
    const updateCar = req.body;

    db.update(req.params.id, updateCar)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({error: "The car information could not be modified"});
        })
});


//   Middleware

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

  function validateCarId(req, res, next) {
    const {id} = req.params;
    db.getById(id)
      .then(car => {
        if(car) {
          req.car = car;
          next();
        } else {
          res.status(400).json({ message: "invalid car id" });
        }   
      })
      .catch(err => {
        res.status(500).json({message: 'exception error'});
      })
  }

  module.exports = router;