//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Requiero mi paquete para validar las sesiones de usuarios logeados
const session = require('express-session');

//Requerimos nuestro paquete de hasheado de contraseñas bcryptjs
const bcryptjs = require('bcryptjs');

//Importamos nuestro modelo de user
const User = require('../../models/userModel');

//Importamos nuestro fichero de generador de tokens
const { generationJWT } = require('../../helpers/generationJWT');

const { bmiCal, boneWeightCal, muscleWeightCal, residualWeightMenCal, residualWeightWomenCal, fatPercentageMenCal, fatPercentageWomenCal, fatWeightCal } = require('../../controllers');

//Controlador que permite hacer login al usuario - Parte lógica
const login = async (req = request, res = response) => {

    //Hemos instalado node-localStorage para poder usarlo en el servidor, un genérico de LocalStorage nativo de Js
    // if (typeof localStorage === "undefined" || localStorage === null) {
    //     const LocalStorage = require('node-localstorage').LocalStorage;
    //     localStorage = new LocalStorage('./scratch');
    // }

    //Desestrucuturamos el email y el password del body y comparamos con lo que hay en la base de datos
    const { email, password } = req.body;

    try {
        //Verificamos si el email existe
        const usuario = await User.findOne({ email });

        //Desestructuro los datos que preciso para mostrar y modificar en el front del usuario que se ha logeado
        const { _id, name, surname, age, gender, height, weight, bmi, boneWeight, muscleWeight, residualWeight, fatPercentage, fatWeight, wristDiameter, femurDiameter } = usuario;

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

        //---------------------------------------Este bloque de código debe ser revisado---------------------------------------
        //No hacemos uso adecuado del JWT - Local storage - Node-session
        //Generar JWT - Json Web Token
        const token = await generationJWT(usuario.id);
        //Guardamos los datos del usuario en el Local Storage
        //Todavía no hacemos uso adecuado del Local Storage
        // localStorage.setItem('token', token);
        // localStorage.setItem('name', name);
        // localStorage.setItem('surname', surname);
        //Guardamos los datos del usuario que inicia sesión
        req.session.data = usuario;
        //----------------------------------------------------------------------------------------------------------------------

        //Ejecutamos las funciones de calculos fisiológicos para el usuario logeado
        const bmiResult = bmiCal(weight, height);
        // bmi = bmiResult.toFixed(2);//IMC
        // console.log(bmi);

        const boneWeightResult = boneWeightCal(height, wristDiameter, femurDiameter);
        // console.log(boneWeightResult.toFixed(2));//boneWeightCal

        const muscleWeightResult = muscleWeightCal(weight, fatWeight, boneWeight, residualWeight)
        // console.log(muscleWeightResult.toFixed(2));//muscleWeightCal

        const residualWeightMenResult = residualWeightMenCal(weight);
        // console.log(residualWeightMenResult.toFixed(2));//residualWeightMenCal

        const residualWeightWomenResult = residualWeightWomenCal(weight);
        // console.log(residualWeightWomenResult.toFixed(2));//residualWeightWomenCal

        const fatPercentageMenResult = fatPercentageMenCal(bmi, age);
        // console.log(fatPercentageMenResult.toFixed(2));//fatPercentageMenCal

        const fatPercentageWomenResult = fatPercentageWomenCal(bmi, age);
        // console.log(fatPercentageWomenResult.toFixed(2));//fatPercentageWomenCal

        const fatWeightResult = fatWeightCal(weight, fatPercentage)
        // console.log(fatWeightResult.toFixed(2));//fatWeightCal

        req.session.isAuth = true;

        //Redirigimos al home el usuario logeado
        res.redirect('/home')

        //Mensaje de login correcto cuando se inicia sesión para el backend
        // res.json({
        //     msg: 'Login Ok',
        //     usuario,
        //     token,
        // });

        //En caso de error, mostramos el error para el backend
    } catch (error) {
        console.log(error);
        // res.status(500).json({
        //     msg: 'Hable con su administrador de redes'
        // });
        res.render('dataNotFound')
    }
}

//Endpoind del logout
const logout = async (req = request, res = response) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/login');
    });
}

//Exportamos el controlador
module.exports = {
    login,
    logout,
}

// new Promise((resolve, reject) => {
//     !req.session.destroy((err) => {
//         if (err) reject(err)
//         res.clearCookie();
//         resolve();
//         res.redirect('/');
//         console.log('hola logout')
//         res.end();
//     });
// });



    // req.session.destroy((error) => {
    //     if (error) {
    //         res.redirect('/pageNotFound');
    //     } else {

    //         res.redirect('/');
    //     }
    // });