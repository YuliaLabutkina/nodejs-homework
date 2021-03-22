const passport = require('passport')
require('../config/passport')
const { HttpCode } = require('./constants')

const checkToken = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user) => {
        const [, token] = req.get('Authorization').split(' ')
        if(!user || err || token !== user.token) {
            return res.status(HttpCode.FORBIDDEN).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                data: 'UNAUTHORIZED',
                message: 'Not authorized',
            })
        }
        req.user = user
        return next()
    })(req, res, next)
}

module.exports = checkToken