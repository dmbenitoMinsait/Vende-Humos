const axios = require('axios')
const emitter = require('../utils/emitter')

const createVendehumos = (req, res, next) => {
    const noticia = req.body

    axios.post('http://localhost:3000/vendehumos', noticia)
        .then(resp =>{
            const nuevaNoticia = resp.data

            // Emitimos un evento de que la noticia ha sido creada
            emitter.emit('vendehumosCreado', nuevaNoticia)

            return res.status(201).json(nuevaNoticia)
        })

}

const getVendehumos = (req, res, next) => {
    axios.get('http://localhost:3000/vendehumos')
        .then(resp => {
            return res.json(resp.data)
        })
}

module.exports = {
    createVendehumos,
    getVendehumos
}