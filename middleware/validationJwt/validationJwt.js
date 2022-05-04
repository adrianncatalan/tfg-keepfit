//Requerimos el paquete de express para usar los métodos de la request y response
const { request, response } = require('express');

//Requerimos el paquete JWT
const jwt = require('jsonwebtoken');

//Creo mi función middleware para validar el token
const validationJWT = async (req = request, res = response, next) => {

    //Aquí especificamos como se va llamar el header que va contener el token del usuario
    //Aquí también leemos el header que se encuentra en la url, de esta manera validamos el token
    const token = req.header('x-token');

    //Importamos nuestro modelo de user
    const User = require('../../models/userModel');

    //Si no hay un token que validar en el header de la url, sacamos al usuario
    if (!token) {
        res.status(401).json({
            msj: 'No hay token en la petición'
        });
    }

    try {
        //Verificamos que lo que hay en el header-token, sea igual al token del usuario
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Mandamos la uid a la request para poder usarlo en el fichero usersDelete u otro fichero en el directorio controllers/users
        req.uid = uid;

        //Leemos el esquema del usuario
        usuario = await User.findById(uid);

        //Mandamos el usuario a la request para poder usarlo en el fichero usersDelete u otro fichero en el directorio controllers/users
        req.usuario = usuario;

        //Validación del uid, si es undefined en la búsqueda
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en la base de datos'
            });
        }

        //Aquí verificamos si el state del usuario logeado es false
        if (!usuario.state) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado en false'
            });
        }

        //Nos permite que siga ejecutandose los otros bloques de códigos
        next();

        //Mensaje de error de que el token no es válido
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

//Exporto el bloque de código en frma de objeto
module.exports = {
    validationJWT,
}