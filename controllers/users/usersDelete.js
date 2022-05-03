//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Importamos nuestro modelo de user
const User = require('../../models/userModel');

//Lógica del endpoint DELETE
const usersDelete = async (req = request, res = response) => {

    const { id } = req.params;

    //Eliminado físico del usuario de la base de datos - NO ES RECOMENDABLE USAR
    // const usuario = await User.findByIdAndDelete(id);

    //Eliminado del usuario para mantener la integridad referencial - SI ES RECOMENDABLE USAR
    const usuario = await User.findByIdAndUpdate(id, { state: false });

    //Monstramos al usuario eliminado
    res.json({
        usuario
    });
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.usersDelete = usersDelete;