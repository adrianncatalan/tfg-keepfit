//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Requerimos nuestro paquete de hasheado de contraseñas bcryptjs
const bcryptjs = require('bcryptjs');

//Importamos nuestro modelo de user, lo colocamos en mayúscula porque vamos a instanciar el usuario
const User = require('../../models/userModel');

//Nombre de la constante que tiene la función
//Lógica del endpoint POST
const usersPost = async (req = request, res = response) => {

    //Recuperamos todo lo que se introduce en el body
    const { uid, name, surname, age, gender, height, weight, bmi, boneWeight, muscleWeight, residualWeight, fatPercentage, fatWeight, wristDiameter, femurDiameter, email, phone, password, imgProfile, imgHeader, rol } = req.body;

    //Instanciamos nuestro modelo de usuario
    const usuario = new User({ uid, name, surname, age, gender, height, weight, bmi, boneWeight, muscleWeight, residualWeight, fatPercentage, fatWeight, wristDiameter, femurDiameter, email, phone, password, imgProfile, imgHeader, rol });

    //Número de vueltas para hashear el password, por defecto es 10
    const salt = bcryptjs.genSaltSync();

    //Hashear el password
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardamos en la base de datos los datos introducidos en el body
    await usuario.save();

    res.json({
        msg: 'Soy el endpoint post',
        usuario
    });
}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.usersPost = usersPost;