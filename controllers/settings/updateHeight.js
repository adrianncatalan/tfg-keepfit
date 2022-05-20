//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Importamos nuestro modelo de user
const User = require('../../models/userModel');

//Lógica del endpoint PUT
const updateHeight = async (req = request, res = response) => {

    //Desestructuro el Id del usuario
    const { id } = req.params;

    //Actualizo al usuario por ID
    await User.findByIdAndUpdate(id, req.body);

    //Lo redireciono al settings, luego de actualizar
    res.redirect('/updateSuccess');
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.updateHeight = updateHeight;