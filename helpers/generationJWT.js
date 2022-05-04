//Importamos el paquete JWT
const jwt = require('jsonwebtoken');

//Creamos nuestra función para emplear el JWT del usuario que inicie sesión
const generationJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h',
        }, (err, token) => {
            if (err) {
                console.log(err);
            } else {
                resolve(token);
            }
        })
    })



}

//Exportamos nuestro bloque de código
module.exports = {
    generationJWT,
}