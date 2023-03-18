const Day = require('../models/Day')

exports.create = (req, res, next) => {
    const yo =0
    delete req.body._id
    Day.findOne({email: req.body.email, date: req.body.date})
    .then( function(err, foundDay) {
        if(!foundDay) {
            const day = new Day({
                ...req.body
            })
            day.save()
            .then(() => res.status(201).json({message: 'Objet enregistré'}))
            .catch(error => res.status(400).json({error}))
        }
        else{
            console.log("this day already exists",foundDay)
        }
    })
    
}

exports.getADay = (req, res, next) => {
    const date = req.params.day + "/"+req.params.month +"/"+req.params.year
    Day.findOne({email: req.params.email, date: date}).orFail()
    .then(day => res.status(200).json(day))
    .catch(error => res.status(400).json({error}))
}

exports.getADayNotInDB= (req, res, next) => {
    const date = req.params.day + "/"+req.params.month +"/"+req.params.year
    const day =Day.findOne({email: req.params.email, date: date})
    .then(function(day) {
        if(day){
            return res.status(400).json({message : "this day already exists", day})
        }
        else {
            return res.status(200).json({message : "this day doesn't exist",error})
        }
    }
    )
    .catch(function(error) {return res.status(200).json({message : "this day doesn't exist",error})})
}

exports.getAll = (req, res, next) => {
    var query = req.params
    Day.find(query)
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}))
}



exports.addFood = (req, res, next) => {
    const filter =req.body
    Day.updateOne(filter, { $push: { food: req.params  } })
    .then(() => res.status(200).json({message : 'Objet modifié!'}))
    .catch(error => res.status(401).json({ error }));
}

exports.deleteDay = (req, res, next) => {
    Day.deleteOne({_id :req.params.dayId})
    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
    .catch(error => res.status(401).json({ error }));
}

exports.removeFood = (req, res, next) => {
    Day.findOne({_id : req.body.dayId})
        .then((day) => {
            const newFood =day.food.filter((foodItem) => foodItem._id != req.body.foodId)
            Day.updateOne({_id : req.body.dayId},{$set: {food:newFood}})
            .then(console.log("day deleted"))
              .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}