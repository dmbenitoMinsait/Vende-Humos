const jwt = require('jsonwebtoken')
const axios = require('axios') // lo necesitaremos para guardar los datos en el servidor

const url = 'http://localhost:3000/users'
//requiere, response, next
const login = (req, res, next) => {
    // console.log(req.body) // Con esto accedemos a los datos que nos han pasado desde el front. (Para acceder a estos datos hemos puesto primero app.use(express.json()) en el app.js)

    const datosLogin = req.body // sacamos los datos del  cuerpo de la petición
    axios.get(`${url}?email=${datosLogin.email}`)
        .then(resp => {
            const usuarios = resp.data
            if (usuarios.length == 0) {
                // No existe el usuario con ese email
                console.log('El email no existe')
                res.status(201)
                return res.json({msg: 'Los datos del login son incorrectos'})
            } else {
                const [ usuario ] = usuarios
                if (usuario.password === datosLogin.password) {
                    // Se ha logueado: devolvemos el token

                    // No hay que enviar datos sensibles. Estos datos los puede leer el cliente
                    const token = jwt.sign({
                        id: usuario.id,
                        nombre: usuario.username,
                        rol: usuario.rol,
                        lang: 'es',
                        theme: 'dark',
                    }, 'PALABRA_SECRETA') // La palabra secreta tendría que estar en otro lado que no fuese el servidor


                    // return res.json({token: token})
                    return res.json({ token }) // se puede poner así porque se llaman igual 
                    // res.json({token}) // No haría falta el return pero por buenas prácticas se pone (por si acaso se sigue ejecutando el código)

                } else {
                    // Los datos son erroneos (no podmeos poner que el email no coincide con la contraseña para no dar pistas)

                    return res.status(401).json({msg: 'Los datos del login son incorrectos'})
                }
            }
        })

}

const signup = (req, res, next) => {
    const datosRegistro = req.body

    datosRegistro.rol = 'USER'

    // Comprobamos que no hay ningun usuario con el mismo email
    axios.get(`${url}?email=${datosRegistro.email}`)
        .then(resp => {
            const usuarios = resp.data
            if (usuarios.length == 0) {
                return axios.post(url, datosRegistro) // la url donde tenemos el mock api

            } else {
                res.status(409) // le añadimos el código de estado (email repetido)
                return Promise.resolve({ data: { msg: 'El email ya está en uso' } }) // tenemos que seguir devolviendo la promesa
            }
        })
        .then(resp => {
            // Aquí es donde devolveríamos la respuesta
            return res.json(resp.data)
        })



}

module.exports = {
    login,
    signup
}