//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Lógica del endpoint PUT
const usersPut = (req = request, res = response) => {

    //Rescatos el id que se introdujo en body o front
    // const id = req.params.id;

    //Otra manera de hacerlo
    const { id } = req.params;

    res.json({
        msg: 'Soy el endpoint put',
        id
    });
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.usersPut = usersPut;