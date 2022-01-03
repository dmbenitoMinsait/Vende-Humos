/* Definimos las diferentes rutas */

const router = require('express').Router()
const AuthController = require('./controllers/auth.controller')
const VendehumosController = require('./controllers/vendehumos.controller')
const {isTokenValid} = require('./utils/middlewares')


router.post('/signup', AuthController.signup)
router.post('/login', AuthController.login)

router.get('/vendehumos', VendehumosController.getVendehumos)

// router.use(isValidToken) // Para que a partir de aquí siempre compruebe si hay un token
router.post('/vendehumos', isTokenValid, VendehumosController.createVendehumos)

// Exportamos la clase
module.exports = router