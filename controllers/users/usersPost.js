//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Requerimos nuestro paquete de hasheado de contraseñas bcryptjs
const bcryptjs = require('bcryptjs');

//Importamos nuestro modelo de user, lo colocamos en mayúscula porque vamos a instanciar el usuario
const Usuario = require('../../models/userModel');

//Nombre de la constante que tiene la función
//Lógica del endpoint POST
const usersPost = async (req = request, res = response) => {

    //Recuperamos todo lo que se introduce en el body
    const { name, surname, age, gender, height, weight, email, phone, password, img, create_at } = req.body;

    //Instanciamos nuestro modelo de usuario
    const usuario = new Usuario({ name, surname, age, gender, height, weight, email, phone, password, img, create_at });

    //Guardamos en una constante la búsqueda del email y phone si esta registrado
    const emailExist = await Usuario.findOne({ email });
    const phoneExist = await Usuario.findOne({ phone });

    //Verificar si el email esta registrado y mandamos un mensaje de error
    if (emailExist) {
        return res.status(400).json({
            msg: 'El email ya está registrado con otro usuario'
        });
    }

    //Verificar si el email esta registrado y mandamos un mensaje de error
    if (phoneExist) {
        return res.status(400).json({
            msg: 'El número de teléfono ya está registrado con otro usuario'
        });
    }

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