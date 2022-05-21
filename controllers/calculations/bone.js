//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Me importo mi función de cálculo de bmi
const { boneWeightCal } = require('./calculations');

//Importamos nuestro modelo de user
const User = require('../../models/userModel');

//Lógica del endpoint PUT
const bone = async (req = request, res = response) => {

    //Desestructuro el Id del usuario
    const { id, weight } = req.params;

    console.log('Oseous mass')
    console.log(weight)

    weight <= 0 ? (
        req.body.boneWeight = 0
    ) : (
        //Tener en cuenta que dividimos la altura entre 100 para que nos arroje un resultado en decimales, porque los valores están todos en enteros
        req.body.boneWeight = boneWeightCal(weight).toFixed(2)
    )

    console.log(req.body.boneWeight)

    //Actualizo al usuario por ID
    await User.findByIdAndUpdate(id, req.body);

    //Lo redireciono al settings, luego de actualizar
    res.redirect('/calculationSuccess');
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.bone = bone;