//En este fichero lo que hacemos es separar la lógica de las rutas(Routes)
//Creamos funciones con sus nombres y el método empleado en los endpoints
//Requerimos Request y Response de Express para usar sus métodos
const { request, response } = require('express');

//Lógica del endpoint GET
const usersGet = (req = request, res = response) => {

    //De esta manera rescatamos los parámetros que envían por la Url
    const params = req.query

    //Otra manera de hacerlo
    const { id, nombre, edad = 'none' } = req.query;

    res.json({
        msg: 'Soy el endpoint get',
        id,
        nombre,
        edad,
    });

    res.render('register');

}

//Exportamos nuestras funciones como objetos para usarlo en el directorio Routes
module.exports.usersGet = usersGet;