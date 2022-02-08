const db = require('../../helpers/db');
const Tank = db.Tank;

module.exports = {
    createTank,
    getAllTanks,
    updateTank,
    delete: _deleteTank
};


async function createTank(tankParam) {

    const user = new Tank(tankParam);
    // save user
    await user.save();
}

async function getAllTanks(){
    return await Tank.find();    
}

async function updateTank(id, userParam) {
    const user = await User.findById(id);

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _deleteTank(id) {
    await Tank.findByIdAndRemove(id);
}