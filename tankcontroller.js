const express = require('express');
const router = express.Router();
const tankService = require('../services/tankservice');
const mongoose = require('mongoose');


router.post('/createTank',createTank);
router.get('/getAllTanks',getAllTanks);
router.put('/updateTank/:id',updateTank)
router.delete('/deleteTank/:id',deleteTank);

module.exports = router;
async function createTank(req, res, next) {
    req.body["_id"] = mongoose.Types.ObjectId().toString();
    tankService.createTank(req.body).then(() => res.json({ message: 'Tank Created!', success: true }))
        .catch(err => next(err));
}

async function getAllTanks(req,res,next){
    tankService.getAllTanks()
        .then(tanks => res.json({tanks:tanks}))
        .catch(err => next(err));
}

async function updateTank(req,res,next){
    tankService.updateTank(req.params.id, req.body)
        .then(() => res.json({message:"Tank Updated", success:true}))
        .catch(err => next(err));
}

async function deleteTank(req, res, next){
    tankService.delete(req.params.id)
        .then(() => res.json({message:"Tank Deleted", success:true}))
        .catch(err => next(err));
}