//Requerimos el paquete de mongooseJs
const mongoose = require('mongoose');

//Realizamos la conexión asíncrona para conevertirlo en una promesa
const dbConnection = async () => {

    //Hacemos un try para inentar la conexión, sino lo fuese, atrapamos el error
    try {
        //Creamos las opciones para el segundo parámetro de la base de datos - Leer documentación de mongoose
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        //Conectamos a la base de datos
        await mongoose.connect(process.env.MONGODB_CONNECTION, options);

        //Mensaje de conexión exitosa
        console.log('Conexión a la base de datos exitosa');

        //Atrapamos el error y lo mostranos por consola para resolverlo en caso de que falle
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la base de datos')
    }

}
//Exportamos la conexión
module.exports = {
    dbConnection
}