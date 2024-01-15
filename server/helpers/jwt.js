const jwt = require('jsonwebtoken')

let JWT_SECRET = process.env.JWT_SECRET
function generateToken(dataUser) {
    let { id } = dataUser
    return jwt.sign({ id }, JWT_SECRET)
}
function verifyToken(token) {
    let data = jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return 'invalidToken'
        } else {
            return decoded
        }
    })
    return data
}

module.exports = { generateToken, verifyToken }