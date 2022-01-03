const jwt = require('jsonwebtoken')
// Los middleware siempre reciben lo mismo
exports.isTokenValid = (req, res, next) => {
    const token = req.headers?.authorization // en el interceptor de angular le añadimos en la cabecera la palabra authorization con el token 

    if (token) {
        try {
            const payload = jwt.verify(token, 'PALABRA_SECRETA')
            console.log({payload})
            return next()
        } catch (err) {
            return res.status(403).json({msg: 'El token no es válido'})
        }
    }

    return res.status(403).json()
}