const expressJwt = require('express-jwt');
const config = require('../nodemon.json');
const userService = require('../api/services/userservice');

module.exports = jwt;

function jwt() {
    const secret = config.env.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done()
};