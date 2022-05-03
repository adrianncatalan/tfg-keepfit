//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Importamos validation-result para obtener los errores del check del directorio routes
const { validationResult } = require('express-validator');

//Creo mi middleware personalizado para la validar los campos del registro del front
//El next nos permite que si se validan todos los campos, pasamos al siguiente middleware
const validation = (req, res, next) => {

    //Guardo los errores de la request
    const errors = validationResult(req);

    //Si existen errores mandamos un código de error 400
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    //Nos permite pasar al middleware y guardar el usuario en la base de datos
    next();

}

//Exportamos nuestros middlewares personalizados
module.exports = {
    validation,
}