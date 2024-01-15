const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const MainController = require('../controllers/MainController')
const errorHandler = require('../middlewares/errorHandler')
const authen = require('../middlewares/authen')
const authorization = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authen)

router.get('/heroes', MainController.getHeroes)
router.get('/favourites', MainController.getFavourites)
router.post('/favourites/:heroId', MainController.addNewFavouritesHero)

router.put('/favourites/:id', authorization, MainController.updateFavouritesHero)

router.use(errorHandler)

module.exports = router