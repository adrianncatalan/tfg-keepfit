//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Me importo mi función de cálculo de bmi
const { muscleWeightCal } = require('./calculations');

//Importamos nuestro modelo de user
const User = require('../../models/userModel');

//Lógica del endpoint PUT
const muscleMass = async (req = request, res = response) => {

    //Desestructuro el Id del usuario
    const { id, weight, fatWeight, boneWeight, residualWeight } = req.params;

    console.log(id)
    console.log(weight)
    console.log(fatWeight)
    console.log(boneWeight)
    console.log(residualWeight)

    //Ejecutamos la función
    req.body.muscleWeight = muscleWeightCal(weight, fatWeight, boneWeight, residualWeight).toFixed(2);

    console.log(req.body.muscleWeight)

    //Actualizo al usuario por ID
    await User.findByIdAndUpdate(id, req.body);

    //Lo redireciono al settings, luego de actualizar
    res.redirect('/calculationSuccess');
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.muscleMass = muscleMass;