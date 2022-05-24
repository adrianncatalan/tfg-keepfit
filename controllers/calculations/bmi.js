//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Me importo mi función de cálculo de bmi
const { bmiCal } = require('./calculations');

//Importamos nuestro modelo de user
const User = require('../../models/userModel');

//Lógica del endpoint PUT
const bmi = async (req = request, res = response) => {

    //Desestructuro el Id del usuario
    const { id, weight, height } = req.params;

    console.log('BMI')
    console.log(weight)
    console.log(height)

    weight <= 0 || height <= 0 ? (
        req.body.bmi = 0
    ) : (
        //Tener en cuenta que dividimos la altura entre 100 para que nos arroje un resultado en decimales, porque los valores están todos en enteros
        req.body.bmi = bmiCal(weight, height).toFixed(2)
    )
    
    console.log(req.body.bmi)

    //Actualizo al usuario por ID
    await User.findByIdAndUpdate(id, req.body);
    //Lo redireciono al settings, luego de actualizar
    res.redirect('/updateSuccess');
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.bmi = bmi;