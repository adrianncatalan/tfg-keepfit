//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Me importo mi función de cálculo de bmi
const { residualWeightMenCal, residualWeightWomenCal } = require('./calculations');

//Importamos nuestro modelo de user
const User = require('../../models/userModel');

//Lógica del endpoint PUT
const residualMass = async (req = request, res = response) => {

    //Desestructuro el Id del usuario
    const { id, weight, gender } = req.params;

    console.log('Gender')
    console.log(weight)
    console.log(gender)

    //Evaluando condiciones con operador ternario
    weight <= 0 ? (
        req.body.residualWeight = 0
    ) : (
        gender === 'Male' ? (
            req.body.residualWeight = residualWeightMenCal(weight).toFixed(2),
            console.log(req.body.residualWeight)
        ) : (
            req.body.residualWeight = residualWeightWomenCal(weight).toFixed(2),
            console.log(req.body.residualWeight)
        )
    )

    if (gender == 'None') {
        req.body.residualWeight = 0;
    }

    //Actualizo al usuario por ID
    await User.findByIdAndUpdate(id, req.body);

    //Lo redireciono al settings, luego de actualizar
    res.redirect('/calculationSuccess');
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.residualMass = residualMass;