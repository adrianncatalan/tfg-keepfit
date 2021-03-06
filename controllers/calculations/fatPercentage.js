//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Me importo mi función de cálculo de bmi
const { fatPercentageMenCal, fatPercentageWomenCal } = require('./calculations');

//Importamos nuestro modelo de user
const User = require('../../models/userModel');

//Lógica del endpoint PUT
const fatPercentage = async (req = request, res = response) => {

    //Desestructuro el Id del usuario
    const { id, bmi, age, gender } = req.params;

    console.log('Fat percentage')
    console.log(bmi)
    console.log(age)
    console.log(gender)

    //Evaluando condiciones con operador ternario
    bmi <= 0 || age <= 0 ? (
        req.body.fatPercentage = 0,
        console.log(req.body.fatPercentage)
    ) : (
        gender === 'Male' ? (
            req.body.fatPercentage = fatPercentageMenCal(bmi, age).toFixed(2),
            console.log(req.body.fatPercentage)
        ) : (
            req.body.fatPercentage = fatPercentageWomenCal(bmi, age).toFixed(2),
            console.log(req.body.fatPercentage)
        )
    )

    if (gender == 'None') {
        req.body.fatPercentage = 0;
    }

    //Actualizo al usuario por ID
    await User.findByIdAndUpdate(id, req.body);

    //Lo redireciono al settings, luego de actualizar
    res.redirect('/calculationSuccess');
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.fatPercentage = fatPercentage;