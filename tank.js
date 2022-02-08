const mongoose = require('mongoose');

const tankSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    width:{type: Number, required: true},
    height:{type: Number, required: true},
    length:{type: Number, required: true},
    diameter:{type: Number, required: true},
    tankShape:{type:String, required:true},
})



module.exports = mongoose.model('Tank',tankSchema);