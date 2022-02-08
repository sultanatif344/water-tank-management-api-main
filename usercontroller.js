const express = require('express');
const router = express.Router();
const userService = require('../services/userservice');
const mongoose = require('mongoose');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/getAll', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/updateUser/:id', update);
router.delete('/deleteUser/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    req.body["_id"] = mongoose.Types.ObjectId().toString();
    userService.create(req.body)
        .then(() => res.json({message:'User Created!', success:true}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json({users}))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({message:'User Updated!', success:true}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}



































































// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// router.post('/signup', (req, res, next) => {
//     console.log('coming here')
//     User.find({ email: req.body.email })
//         .exec()
//         .then(user => {
//             if (user.length >= 1) {
//                 return res.status(409).json({
//                     message: 'Mail exists'
//                 })
//             }
//             else {
//                 bcrypt.hash(req.body.password, 10, (err, hash) => {
//                     if (err) {
//                         return res.status(500).json({
//                             error: err
//                         });
//                     }
//                     else {
//                         console.log('completed')
//                         const user = new User({
//                             _id: new mongoose.Types.ObjectId(),
//                             username: req.body.userName,
//                             email: req.body.email,
//                             passowrd: hash,
//                             userType: req.body.userType,
//                             authorizations: {
//                                 waterLevel: req.body.waterLevel,
//                                 waterStatus: req.body.waterStatus,
//                                 addATank: req.body.addATank,
//                                 tankList: req.body.tankList,
//                                 motorStatus: req.body.motorStatus,
//                                 adminPanel: req.body.adminPanel
//                             }
//                         })
//                         User.create(user).then(result => {
//                             res.status(200).json({
//                                 message: 'User Created'
//                             })
//                         });
//                     }
//                 })
//             }
//         })
//         .catch(err => console.log(err))
// });

// module.exports = router;