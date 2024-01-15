const { Favourite } = require('../models');

async function authorization(req, res, next) {
    try {
        let data = await Favourite.findByPk(req.params.id)
        if (!data) {
            throw { name: 'heroNotFound' }
        }
        if (data.userId !== req.user.id) {
            throw { name: 'forbiddenOwner' }
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authorization