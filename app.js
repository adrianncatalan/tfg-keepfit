//Requerimos dotenv para el fichero de configuración de las variables de entorno hagan efecto
require('dotenv').config({ path: __dirname + '/.env' });

//Requerimos el servidor que hemos creado como clase en el directorio models
const Server = require('./models/server');

//Creamos una instancia del servidor
const server = new Server();

//Disparamos el método listen para levantar el servidor de nuestra aplicación
server.listen();

//Este bloque de código nos permite saber si podemos usar Local Storage en el objeto window
//Tenemos que instalarnos otras dependencias para que funcione el Local Storage porque estamos en el servidor
// if (typeof window !== 'undefined') {
//     console.log('You are on the browser')
//     // 👉️ can use localStorage here
// } else {
//     console.log('You are on the server')
//     // 👉️ can't use localStorage
// }