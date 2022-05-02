//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Lógica del endpoint PATCH
const usersPatch = (req = request, res = response) => {
    res.json({
        msg: 'Soy el endpoint patch'
    });
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.usersPatch = usersPatch;