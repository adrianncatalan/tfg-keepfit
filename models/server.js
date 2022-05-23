//Requerimos express para desplegar nuestro servidor
const express = require('express');

//Requerimos morgan
const morgan = require('morgan');

//Requiero los Cors
const cors = require('cors');

//Requiero mi paquete hbs para realizar mis parciales
const hbs = require('hbs');

//Requiero mi paquete para validar las sesiones de usuarios logeados
const session = require('express-session');

//Requiero el paquete de express-upload
const fileUpload = require('express-fileupload');

const path = require('path');

//Requiero la conexión a la base de datos
const { dbConnection } = require('../database/config');

//Requiero el paquete de sesión de conexiones de mongo
const MongoDBSession = require('connect-mongodb-session')(session);

const store = new MongoDBSession({
    uri: process.env.MONGODB_CONNECTION,
    collection: 'sessions'
});

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

        // Creamos nuestra sesión
        this.app.use(session({
            secret: 'SoyLaContraseñaDeLaSesión',
            resave: 'false',
            saveUninitialized: 'false',
            cookie: { maxAge: 1200000 },
            store: store,
            // cookie: { secure: true }
        }))

        //Nos creamos una propiedad con la ruta de /users
        this.userPath = '/users';

        //Me creo mi ruta de autenticación
        this.authPath = '/auth';

        //Me creo mi ruta de settings - update
        this.settingsNamePath = '/settingsName';
        this.settingsSurnamePath = '/settingsSurname';
        this.settingsAgePath = '/settingsAge';
        this.settingsGenderPath = '/settingsGender';
        this.settingsHeightPath = '/settingsHeight';
        this.settingsWeightPath = '/settingsWeight';
        this.settingsEmailPath = '/settingsEmail';
        this.settingsPhonePath = '/settingsPhone';
        this.settingsPasswordPath = '/settingsPassword';

        //Me creo mi ruta de calculation - update
        this.calculationPath = '/calculation';
        this.calculation2Path = '/calculation2';
        this.calculation3Path = '/calculation3';
        this.calculation4Path = '/calculation4';
        this.calculation5Path = '/calculation5';
        this.calculation6Path = '/calculation6';

        //Rutas para subir fotos
        this.uploadsImgProfile = '/uploadsImgProfile';
        this.uploadsImgHeader = '/uploadsImgHeader';
        this.updateImgProfile = '/updateImgProfile';
        this.updateImgHeader = '/updateImgHeader';

        //Requerimos el paquete para usar los handlebars para express(hbs) - Puedo establecer las rutas de mis páginas
        this.app.set('view engine', 'hbs'); //Si colocamos html, podemos cambiar el formato

        //Cambiando el formato .hbs a formato.html
        // this.app.engine('html', require('hbs').__express);

        // Solo para visualizar la ruta absoluta de mis partials
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

        //Nos permite no guardar el cache, y hacemos que los usuarios cuando hagan logout no puedan volver atrás
        this.app.use(function (req, res, next) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            next();
        });

        //Usando Cors para la protección seguridad del navegador 
        //Los Cors restringen las solicitudes HTTP de origen cruzado
        this.app.use(cors());

        //Nos permite ir al sitio web por defecto de la aplicación
        this.app.use(express.static('public'));

        //Analiza las requests entrantes con cargas útiles codificadas en urlencoded y se basa en body-parser
        this.app.use(express.urlencoded({ extended: false }));

        //Me permite ver por consola cada petición que hago al servidor detalladamente
        this.app.use(morgan('dev'));

        // Note that this option available for versions 1.0.0 and newer. 
        //Carga de archivos - Configuración
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));
    }

    //Creamos un método routes, aquí definimos nuestras rutas
    routes() {

        //Podemos colocar todas las rutas que precise nuestra aplicación
        //Dependiendo de la petición que se haga, get, post etc... se ejecutará el bloque de código correspondiente
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/users'));
        this.app.use(this.settingsNamePath, require('../routes/settingsName'));
        this.app.use(this.settingsSurnamePath, require('../routes/settingsSurname'));
        this.app.use(this.settingsAgePath, require('../routes/settingsAge'));
        this.app.use(this.settingsGenderPath, require('../routes/settingsGender'));
        this.app.use(this.settingsHeightPath, require('../routes/settingsHeight'));
        this.app.use(this.settingsWeightPath, require('../routes/settingsWeight'));
        this.app.use(this.settingsEmailPath, require('../routes/settingsEmail'));
        this.app.use(this.settingsPhonePath, require('../routes/settingsPhone'));
        this.app.use(this.settingsPasswordPath, require('../routes/settingsPassword'));
        this.app.use(this.calculationPath, require('../routes/calculation'));
        this.app.use(this.calculation2Path, require('../routes/calculation2'));
        this.app.use(this.calculation3Path, require('../routes/calculation3'));
        this.app.use(this.calculation4Path, require('../routes/calculation4'));
        this.app.use(this.calculation5Path, require('../routes/calculation5'));
        this.app.use(this.calculation6Path, require('../routes/calculation6'));
        this.app.use(this.uploadsImgProfile, require('../routes/uploadsImgProfile'));
        this.app.use(this.uploadsImgHeader, require('../routes/uploadsImgHeader'));
        this.app.use(this.updateImgProfile, require('../routes/updateImgProfile'));
        this.app.use(this.updateImgHeader, require('../routes/updateImgHeader'));


        const isAuth = (req, res, next) => {
            if (req.session.isAuth) {
                next()
            } else {
                res.redirect('/login');
            }
        }

        //Rutas o urls a las views de la aplicación - login
        this.app.get('/login', (req, res) => {
            res.render('login');
        });

        //Rutas o urls a las views de la aplicación - home
        this.app.get('/home', isAuth, (req, res) => {
            // console.log(req.session)
            //Si el login es exitoso, el usuario va al home
            res.render('home', {
                _id: req.session.data._id,
                name: req.session.data.name,
                surname: req.session.data.surname,
                age: req.session.data.age,
                gender: req.session.data.gender,
                height: req.session.data.height,
                weight: req.session.data.weight,
                wristDiameter: req.session.data.wristDiameter,
                femurDiameter: req.session.data.femurDiameter,
                bmi: req.session.data.bmi,
                boneWeight: req.session.data.boneWeight,
                muscleWeight: req.session.data.muscleWeight,
                residualWeight: req.session.data.residualWeight,
                fatWeight: req.session.data.fatWeight,
                fatPercentage: req.session.data.fatPercentage,
                imgProfile: req.session.data.imgProfile,
                imgHeader: req.session.data.imgHeader,
            });
        });

        //Rutas o urls a las views de la aplicación - register
        this.app.get('/register', (req, res) => {
            res.render('register');
        });

        //Rutas o urls a las views de la aplicación - foodNutrition
        this.app.get('/foodNutrition', isAuth, (req, res) => {
            res.render('foodNutrition')
        });

        //---------Rutas de las secciones de las dietas de food & nutrition - Vegan diets
        this.app.get('/foodNutrition/veganDiet-1', isAuth, (req, res) => {
            res.render('./diets/veganDiet/veganDiet1')
        });

        this.app.get('/foodNutrition/veganDiet-2', isAuth, (req, res) => {
            res.render('./diets/veganDiet/veganDiet2')
        });

        this.app.get('/foodNutrition/veganDiet-3', isAuth, (req, res) => {
            res.render('./diets/veganDiet/veganDiet3')
        });

        this.app.get('/foodNutrition/veganDiet-4', isAuth, (req, res) => {
            res.render('./diets/veganDiet/veganDiet4', {

            });
        });

        //---------Rutas de las secciones de las dietas de food & nutrition - Intermittent fasting diets
        this.app.get('/foodNutrition/intermittentFastingDiets-1', isAuth, (req, res) => {
            res.render('./diets/intermittentFastingDiets/intFastDiets1')
        });

        this.app.get('/foodNutrition/intermittentFastingDiets-2', isAuth, (req, res) => {
            res.render('./diets/intermittentFastingDiets/intFastDiets2')
        });

        this.app.get('/foodNutrition/intermittentFastingDiets-3', isAuth, (req, res) => {
            res.render('./diets/intermittentFastingDiets/intFastDiets3')
        });

        this.app.get('/foodNutrition/intermittentFastingDiets-4', isAuth, (req, res) => {
            res.render('./diets/intermittentFastingDiets/intFastDiets4')
        });

        //---------Rutas de las secciones de las dietas de food & nutrition - Ketogenic diets
        this.app.get('/foodNutrition/ketogenicDiet-1', isAuth, (req, res) => {
            res.render('./diets/ketogenicDiet/ketDiets1')
        });

        this.app.get('/foodNutrition/ketogenicDiet-2', isAuth, (req, res) => {
            res.render('./diets/ketogenicDiet/ketDiets2')
        });

        this.app.get('/foodNutrition/ketogenicDiet-3', isAuth, (req, res) => {
            res.render('./diets/ketogenicDiet/ketDiets3')
        });

        this.app.get('/foodNutrition/ketogenicDiet-4', isAuth, (req, res) => {
            res.render('./diets/ketogenicDiet/ketDiets4')
        });

        //Rutas o urls a las views de la aplicación - trainingPlans
        this.app.get('/trainingPlans', isAuth, (req, res) => {
            res.render('trainingPlans')
        });

        //---------Rutas de las sección de entrenamiento de createTrainingPlan
        this.app.get('/trainingPlans/createTrainingPlan', isAuth, (req, res) => {
            res.render('./trainings/createTrainingPlan/createTrainingPlan')
        });

        //---------Rutas de las sección de entrenamiento de fitness
        this.app.get('/trainingPlans/fitness', isAuth, (req, res) => {
            res.render('./trainings/fitness/fitness')
        });

        //---------Rutas de las sección de entrenamiento de cardio
        this.app.get('/trainingPlans/cardio', isAuth, (req, res) => {
            res.render('./trainings/cardio/cardio')
        });

        //---------Rutas de las sección de entrenamiento de flexibility
        this.app.get('/trainingPlans/flexibility', isAuth, (req, res) => {
            res.render('./trainings/flexibility/flexibility')
        });

        //Rutas o urls a las views de la aplicación - myWorkouts
        this.app.get('/myWorkouts', isAuth, (req, res) => {
            res.render('myWorkouts')
        });

        this.app.get('/myWorkouts/biceps', isAuth, (req, res) => {
            res.render('./myWorkouts/myWorkoutsBiceps')
        });

        this.app.get('/myWorkouts/chest', isAuth, (req, res) => {
            res.render('./myWorkouts/myWorkoutsChest')
        });

        this.app.get('/myWorkouts/dorsal', isAuth, (req, res) => {
            res.render('./myWorkouts/myWorkoutsDorsal')
        });

        this.app.get('/myWorkouts/forearms', isAuth, (req, res) => {
            res.render('./myWorkouts/myWorkoutsForearms')
        });

        this.app.get('/myWorkouts/legs', isAuth, (req, res) => {
            res.render('./myWorkouts/myWorkoutsLegs')
        });

        this.app.get('/myWorkouts/shoulders', isAuth, (req, res) => {
            res.render('./myWorkouts/myWorkoutsShoulders')
        });

        this.app.get('/myWorkouts/triceps', isAuth, (req, res) => {
            res.render('./myWorkouts/myWorkoutsTriceps')
        });

        //Rutas o urls a las views de la aplicación - settings
        this.app.get('/settings', isAuth, (req, res) => {
            res.render('settings', {
                _id: req.session.data._id,
                name: req.session.data.name,
                surname: req.session.data.surname,
                age: req.session.data.age,
                gender: req.session.data.gender,
                height: req.session.data.height,
                weight: req.session.data.weight,
                wristDiameter: req.session.data.wristDiameter,
                femurDiameter: req.session.data.femurDiameter,
                email: req.session.data.email,
                phone: req.session.data.phone,
                password: req.session.data.password,
                imgProfile: req.session.data.imgProfile,
                imgHeader: req.session.data.imgHeader,
            });
        });

        //Rutas o urls a las views de la aplicación - updateSuccess
        this.app.get('/updateSuccess', isAuth, (req, res) => {
            res.render('updateSuccess');
        });

        //Rutas o urls a las views de la aplicación - calculationSuccess
        this.app.get('/calculationSuccess', isAuth, (req, res) => {
            res.render('calculationSuccess');
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