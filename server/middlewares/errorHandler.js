function errorHandler(error, req, res, next) {
    console.log(error)
    let statusCode = 500
    let message = 'Internal server error'
    switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            statusCode = 400
            message = error.errors[0].message
            break
        case 'emailRequired':
            statusCode = 400
            message = 'Email is required'
            break
        case 'passwordRequired':
            statusCode = 400
            message = 'Password is required'
            break
        case 'favouriteAlreadyExists':
            statusCode = 400
            message = 'You already add this hero to your favorites'
            break
        case 'invalidUser':
            statusCode = 401
            message = "Invalid email/password"
            break
        case 'invalidToken':
            statusCode = 401
            message = "Invalid token"
            break
        case 'forbiddenOwner':
            statusCode = 403
            message = "You are not authorized"
            break
        case 'heroNotFound':
            statusCode = 404
            message = "Hero not found"
            break
    }
    res.status(statusCode).json({ message })
}

module.exports = errorHandler