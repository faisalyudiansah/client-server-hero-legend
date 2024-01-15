const { User, Hero, Favourite } = require('../models');
const { Op } = require("sequelize");
class MainController {
    static async getHeroes(req, res, next) {
        try {
            let data = await Hero.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getFavourites(req, res, next) {
        try {
            let data = await Favourite.findAll({
                where: {
                    userId: req.user.id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Hero,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                order: [['createdAt', 'asc']]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addNewFavouritesHero(req, res, next) {
        try {
            let { heroId } = req.params
            let findHero = await Hero.findOne({
                where: {
                    id: heroId
                }
            })
            if (!findHero) {
                throw { name: 'heroNotFound' }
            }
            let validate = await Favourite.findOne({
                where: {
                    [Op.and]: [
                        { heroId },
                        { userId: req.user.id }
                    ]
                }
            })
            if (validate) {
                throw { name: 'favouriteAlreadyExists' }
            }
            let dataBody = {
                heroId,
                userId: req.user.id,
            }
            let data = await Favourite.create(dataBody)
            res.status(201).json({
                id: data.id,
                userId: data.userId,
                heroId: data.heroId,
                role: data.role,
                power: data.power
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateFavouritesHero(req, res, next) {
        try {
            let { role, power } = req.body
            let findFavorite = await Favourite.findByPk(req.params.id)
            if (!findFavorite) {
                throw { name: 'heroNotFound' }
            }
            await findFavorite.update({ role, power })
            res.status(200).json({ message: "Hero has been updated" })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MainController