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

    const { email, password } = req.body;

    try {

        //Verificamos si el email existe
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Email no es correcto',
            })
        }

        //Verificamos si el usuario existe en la base de datos
        if (!usuario.state) {
            return res.status(400).json({
                msg: 'Usuario no existe en la base de datos',
            })
        }

        //Verificamos que el password concuerde con el de la base de datos
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Password no es correcto',
            })
        }

        //Generar JWT - Json Web Token
        const token = await generationJWT(usuario.id);

        //Mostramos lo que se envía
        res.json({
            msg: 'Login Ok',
            usuario,
            token,
        });
        //En caso de error, mostraos el error
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con su adminastrador de redes'
        });
    }
}

//Exportamos el controlador
module.exports = {
    login,
}