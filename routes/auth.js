//Requerimos esta función del paquete express para movernos por rutas
const { Router } = require('express');

//Importamos check de express-validator
//Nos va permitir ejecutar todos los middlewares para verificar los campos, antes de disparar la ruta
const { check } = require('express-validator')

//Importamos nuestro controlador del directorio auth login
const { login } = require('../controllers/auth/auth');

//Importamos nuestro archivo de validaciones
const { validation } = require('../middleware/validation/validation');

//Creamos una constante que guarde las propiedades Router
const router = Router();

//Ruta del login
router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validation
], login)

//Exportamos el router
module.exports = router;