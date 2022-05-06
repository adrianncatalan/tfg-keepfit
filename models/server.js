//Requerimos express para desplegar nuestro servidor
const express = require('express');

//Requerimos morgan
const morgan = require('morgan');

//Requiero los Cors
const cors = require('cors');

//Requiero mi paquete hbs para realizar mis parciales
const hbs = require('hbs');


const path = require('path');

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

        //Me creo mi ruta de autenticación
        this.authPath = '/auth';

        //Requerimos el paquete para usar los handlebars para express(hbs) - Puedo establecer las rutas de mis páginas
        this.app.set('view engine', 'hbs');

        //Solo para visualizar la ruta absoluta de mis partials
        // console.log(path.join(__dirname));

        //Por alguna razón la ruta absoluta esta en models, se ha pasado el partial al directorio models
        hbs.registerPartials(path.join(__dirname, '/partials'));

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

        //Analiza las requests entrantes con cargas útiles codificadas en urlencoded y se basa en body-parser
        this.app.use(express.urlencoded({ extended: false }));

        //Me permite ver por consola cada petición que hago al servidor detalladamente
        this.app.use(morgan('dev'));
    }

    //Creamos un método routes, aquí definimos nuestras rutas
    routes() {

        //Podemos colocar todas las rutas que precise nuestra aplicación
        //Dependiendo de la petición que se haga, get, post etc... se ejecutará el bloque de código correspondiente
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/users'));

        //Rutas o urls a las views de la aplicación - register
        this.app.get('/register', (req, res) => {
            res.render('register');
        });

        //Rutas o urls a las views de la aplicación - home
        this.app.get('/home', (req, res) => {
            res.render('home');
        });

        //Rutas o urls a las views de la aplicación - foodNutrition
        this.app.get('/foodNutrition', (req, res) => {
            res.render('foodNutrition');
        });

        //---------Rutas de las secciones de las dietas de food & nutrition - Vegan diets
        this.app.get('/foodNutrition/veganDiet-1', (req, res) => {
            res.render('./diets/veganDiet/veganDiet1');
        });

        this.app.get('/foodNutrition/veganDiet-2', (req, res) => {
            res.render('./diets/veganDiet/veganDiet2');
        });

        this.app.get('/foodNutrition/veganDiet-3', (req, res) => {
            res.render('./diets/veganDiet/veganDiet3');
        });

        this.app.get('/foodNutrition/veganDiet-4', (req, res) => {
            res.render('./diets/veganDiet/veganDiet4');
        });

        //---------Rutas de las secciones de las dietas de food & nutrition - Intermittent fasting diets
        this.app.get('/foodNutrition/intermittentFastingDiets-1', (req, res) => {
            res.render('./diets/intermittentFastingDiets/intFastDiets1');
        });

        this.app.get('/foodNutrition/intermittentFastingDiets-2', (req, res) => {
            res.render('./diets/intermittentFastingDiets/intFastDiets2');
        });

        this.app.get('/foodNutrition/intermittentFastingDiets-3', (req, res) => {
            res.render('./diets/intermittentFastingDiets/intFastDiets3');
        });

        this.app.get('/foodNutrition/intermittentFastingDiets-4', (req, res) => {
            res.render('./diets/intermittentFastingDiets/intFastDiets4');
        });

        //---------Rutas de las secciones de las dietas de food & nutrition - Ketogenic diets
        this.app.get('/foodNutrition/ketogenicDiet-1', (req, res) => {
            res.render('./diets/ketogenicDiet/ketDiets1');
        });

        this.app.get('/foodNutrition/ketogenicDiet-2', (req, res) => {
            res.render('./diets/ketogenicDiet/ketDiets2');
        });

        this.app.get('/foodNutrition/ketogenicDiet-3', (req, res) => {
            res.render('./diets/ketogenicDiet/ketDiets3');
        });

        this.app.get('/foodNutrition/ketogenicDiet-4', (req, res) => {
            res.render('./diets/ketogenicDiet/ketDiets4');
        });

        //Rutas o urls a las views de la aplicación - trainingPlans
        this.app.get('/trainingPlans', (req, res) => {
            res.render('trainingPlans');
        });

        //Rutas o urls a las views de la aplicación - myWorkouts
        this.app.get('/myWorkouts', (req, res) => {
            res.render('myWorkouts');
        });

        //Rutas o urls a las views de la aplicación - settings
        this.app.get('/settings', (req, res) => {
            res.render('settings');
        });

        //Rutas o urls a las views de la aplicación - forgotPassword
        this.app.get('/forgotPassword', (req, res) => {
            res.render('forgotPassword');
        });

        //Rutas o urls a las views de la aplicación - about
        this.app.get('/about', (req, res) => {
            res.render('about');
        });

        //Rutas o urls a las views de la aplicación - privacyPolicy
        this.app.get('/privacyPolicy', (req, res) => {
            res.render('privacyPolicy');
        });

        //Rutas o urls a las views de la aplicación - cookiePolicy
        this.app.get('/cookiePolicy', (req, res) => {
            res.render('cookiePolicy')
        });

        //Rutas o urls a las views de la aplicación - pageNotFound
        this.app.get('/*', (req, res) => {
            res.render('pageNotFound')
        });

        //Rutas o urls a las views de la aplicación - pageNotFound
        this.app.get('/dataNotFound', (req, res) => {
            res.render('dataNotFound')
        });
    }

    //Este método define el puerto que utiliza el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

//Exportamos el servidor
module.exports = Server;