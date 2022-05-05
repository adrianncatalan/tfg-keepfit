//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Requerimos nuestro paquete de hasheado de contraseñas bcryptjs
const bcryptjs = require('bcryptjs');

//Importamos nuestro modelo de user
const User = require('../../models/userModel');

//Importamos nuestro fichero de generador de tokens
const { generationJWT } = require('../../helpers/generationJWT');



//Controlador que permite hacer login al usuario - Parte lógica
const login = async (req = request, res = response) => {

    //Desestrucuturamos el email y el password del body y comparamos con lo que hay en la base de datos
    const { email, password } = req.body;

    try {
        //Verificamos si el email existe
        const usuario = await User.findOne({ email });

        //Desestructuro los datos que preciso para mostrar y modificar en el front del usuario que se ha logeado
        const { name, age, surname, height, weight, bodyMassIndex, bodyFatPercentage, boneMass, totalBodyFatWeight, totalMuscleWeight } = usuario;

        //Si no lo encuentra fue porqu el correo fue introducido incorrectamente
        if (!usuario) {

            return res.render('dataNotFound');

            // return res.status(400).json({
            //     msg: 'Email no es correcto',
            // });
        }

        //Verificamos si el usuario existe en la base de datos
        if (!usuario.state) {

            return res.render('dataNotFound')

            // return res.status(400).json({
            //     msg: 'Usuario no existe en la base de datos',
            // });
        }

        //Verificamos que el password concuerde con el de la base de datos
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {

            return res.render('dataNotFound')

            //Código para el backend
            // return res.status(400).json({
            //     msg: 'Password no es correcto',
            // });
        }

        //Generar JWT - Json Web Token
        const token = await generationJWT(usuario.id);

        //Si el login es exitoso, el usuario va al home
        res.render('home', {
            name: name,
            age: age,
            surname: surname,
            height: height,
            weight: weight,
            bodyMassIndex: bodyMassIndex,
            bodyFatPercentage: bodyFatPercentage,
            boneMass: boneMass,
            totalBodyFatWeight: totalBodyFatWeight,
            totalMuscleWeight: totalMuscleWeight,
        });

        //Mostramos lo que se envía en el backend
        // res.json({
        //     msg: 'Login Ok',
        //     usuario,
        //     token,
        // });

        //En caso de error, mostramos el error
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con su administrador de redes'
        });
    }
}

//Exportamos el controlador
module.exports = {
    login,
}