//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Requerimos nuestro paquete de hasheado de contraseñas bcryptjs
const bcryptjs = require('bcryptjs');

//Importamos nuestro modelo de user
const User = require('../../models/userModel');

//Lógica del endpoint PUT
const usersPut = async (req = request, res = response) => {

    //Desestructuro el Id del usuario
    const { id } = req.params;

    //Desestructuro lo que no quiero que se actualice en la base de datos
    const { _id, password, create_at, rol, state, google, ...params } = req.body;

    //Validar contra base de datos
    if (password) {
        //Número de vueltas para hashear el password, por defecto es 10
        const salt = bcryptjs.genSaltSync();
        //Hashear el password
        params.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await User.findByIdAndUpdate(id, params);
    res.json({
        msg: 'Soy el endpoint put',
        usuario
    });
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.usersPut = usersPut;