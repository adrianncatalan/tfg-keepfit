//Requerimos express para desplegar nuestro servidor
const express = require('express');

//Requiero los Cors
const cors = require('cors');

//Requiero mi paquete hbs para realizar mis parciales
var hbs = require('hbs');

//Requiero la conexión a la base de datos
const { dbConnection } = require('../database/config')

//Creamos una clase de nuestro servidor
class Server {

    //En el constructor colocamos las propiedades del servidor
    constructor() {

        //Esta propiedad guarda express
        this.app = express();

        //Esta propiedad guarda el puerto de escucha del servidor
        this.port = process.env.PORT;

        //Lectura y parseo del body --> Cualquier información la va serializar en formato Json
        this.app.use(express.json());

        //Nos creamos una propiedad con la ruta de /users
        this.userPath = '/users';

        //Requerimos el paquete para usar los handlebars para express(hbs)
        this.app.set('view engine', 'hbs');

        //Hacemos la conexión a la base de datos
        this.connectionDB();

        //Aquí se dispara el método de los middlewares
        this.middlewares();

        //Esto dispara el método y todas las rutas definidas en el método routes se configuran para ser visualizadas
        this.routes();

    }

    //Creamos el método para la conexión a la base de datos
    async connectionDB() {
        await dbConnection();
    }

    //Creamos el método de los middlewares
    middlewares() {

        //Usando Cors para la protección seguridad del navegador 
        //Los Cors restringen las solicitudes HTTP de origen cruzado
        this.app.use(cors());

        //Nos permite ir al sitio web por defecto de la aplicación
        this.app.use(express.static('public'));
    }

    //Creamos un método routes, aquí definimos nuestras rutas
    routes() {

        //Podemos colocar todas las rutas que precise nuestra aplicación
        //Dependiendo de la petición que se haga, get, post etc... se ejecutará el bloque de código correspondiente
        this.app.use(this.userPath, require('../routes/users'));

        this.app.get('/register', (req, res) => {
            res.render('register')
        })

        //Rutas o urls a las views de la aplicación
        this.app.get('/home', (req, res) => {
            res.render('home')
        })

        //Rutas o urls a las views de la aplicación
        this.app.get('/forgotPassword', (req, res) => {
            res.render('forgotPassword');
        })

        //Rutas o urls a las views de la aplicación
        this.app.get('/about', (req, res) => {
            res.render('about')
        })

        //Rutas o urls a las views de la aplicación
        this.app.get('/privacyPolicy', (req, res) => {
            res.render('privacyPolicy');
        })

        //Rutas o urls a las views de la aplicación
        this.app.get('/cookiePolicy', (req, res) => {
            res.render('cookiePolicy')
        })
    }

    //Este método define el puerto que utiliza el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

}

//Exportamos el servidor
module.exports = Server;