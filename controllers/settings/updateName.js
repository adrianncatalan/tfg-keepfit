//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Requerimos nuestro paquete de hasheado de contraseñas bcryptjs
const bcryptjs = require('bcryptjs');

//Importamos nuestro modelo de user
const User = require('../../models/userModel');

//Lógica del endpoint PUT
const updateName = async (req = request, res = response) => {

    //Desestructuro el Id del usuario
    const { id } = req.params;

    const { name } = req.body;

    //Desestructuro lo que no quiero que se actualice en la base de datos
    const { _id, create_at, rol, state, google, surname, age, gender, height, weight, bmi, boneWeight, muscleWeight, residualWeight, fatPercentage, fatWeight, wristDiameter, femurDiameter: email, phone, password, ...params } = req.body;

    //Actualizo al usuario por ID
    await User.findByIdAndUpdate(id, req.body);

    //Lo redireciono al settings, luego de actualizar
    res.redirect('/updateSuccess');
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.updateName = updateName;