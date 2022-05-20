//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Importamos nuestro modelo de user
const User = require('../../models/userModel');

//Requerimos nuestro paquete de hasheado de contraseñas bcryptjs
const bcryptjs = require('bcryptjs');

//Lógica del endpoint PUT
const updatePassword = async (req = request, res = response) => {

    //Desestructuro el Id del usuario
    const { id } = req.params;

    //Validar contra base de datos
    if (req.body) {
        //Número de vueltas para hashear el password, por defecto es 10
        const salt = bcryptjs.genSaltSync();
        //Hashear el password
        req.body = bcryptjs.hashSync(password, salt);
    }

    //Actualizo al usuario por ID
    await User.findByIdAndUpdate(id, req.body);

    //Lo redireciono al settings, luego de actualizar
    res.redirect('/updateSuccess');
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.updatePassword = updatePassword;