//Requerimos dotenv para el fichero de configuración de las variables de entorno hagan efecto
require('dotenv').config();

//Requerimos el servidor que hemos creado como clase en el directorio models
const Server = require('./models/server');

//Creamos una instancia del servidor
const server = new Server();

//Disparamos el método listen para levantar el servidor de nuestra aplicación
server.listen();