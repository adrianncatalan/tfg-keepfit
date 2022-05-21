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

    // try {

    //     const { id } = req.params;

    //     const password = req.body.password;

    //     const salt = await bcryptjs.genSaltSync();

    // } catch (error) {

    // }



    //Desestructuro el Id del usuario
    const { id } = req.params;

    const salt = await bcryptjs.genSaltSync();

    //Hashear el password
    req.body.password = await bcryptjs.hashSync(req.body.password, salt);

    console.log(req.body.password)

    await User.findByIdAndUpdate(id, req.body);

    //Lo redireciono al settings, luego de actualizar
    res.redirect('/updateSuccess');
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.updatePassword = updatePassword;