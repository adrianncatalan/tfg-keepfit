//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Importamos nuestro modelo de user, lo colocamos en mayúscula porque vamos a instanciar el usuario
const User = require('../../models/userModel');

//Lógica del endpoint GET
const usersGet = async (req = request, res = response) => {

    //Parámetros para visualizar un determinado número de usuarios
    const { limite = 4, desde = 0 } = req.query;

    //Esta constante me permite ocultar a los usuarios que han sido "eliminados" de la base de datos
    //Ocultamos a los usuarios eliminados para no perder la integridad referencial entre colecciones
    const query = { state: true };

    //--------------------------Este bloque de código se ha refactorizado-------------------------------
    //Guardamos en una constante todos los usuarios, a través de nuestro User esquema
    // const users = await User.find(query)
    //Con estos métodos podemos hacer la paginación para ver una cantidad determinada de usuarios
    // .skip(Number(desde))
    // .limit(Number(limite))
    //Con este método, obtenemos el total de registros de usuarios 
    // const total = await User.countDocuments(query);
    //---------------------------Este bloque de código se ha refactorizado------------------------------

    //Ejecutamos todos los métodos con Promise.all - La respuesta a la petición es más rápida y eficiente
    //Desestructuramos para mostrar el total de usuarios y registros
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    //Podemos ver los registros de los usuarios
    res.json({
        total,
        users
    });

}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.usersGet = usersGet;