//Requerimos esta función del paquete express para movernos por rutas
const { Router } = require('express');

//Creamos una constante que guarde las propiedades Router
const router = Router();

//Importamos check de express-validator
//Nos va permitir ejecutar todos los middlewares para verificar los campos, antes de disparar la ruta
const { check } = require('express-validator')

//Importo mi función que valida los roles, emails, y otros campos que están permitidos en la base de datos para los usuarios
const { esRolValido, esEmailValido, esPhoneValido, existeUsuarioPorId } = require('../helpers/db-validators')

//Requiero mis controladores
const { usersGet } = require('../controllers/users/usersGet');
const { usersPost } = require('../controllers/users/usersPost');
const { usersPut } = require('../controllers/users/usersPut');
const { usersPatch } = require('../controllers/users/usersPatch');
const { usersDelete } = require('../controllers/users/usersDelete');

//Requiero mi middleware personalizado que utilizaré como segundo parámetro en mis endpoints o rutas
const { validation } = require('../middleware/validation/validation');
//Vamos a colocar todas nuestras rutas o endpoints aquí
//Endpoint GET
router.get('/', usersGet);

//Endpoint POST
router.post('/', [
    check('name', 'El nombre no es válido').not().isEmpty(),
    check('surname', 'El apellido no es válido').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(esEmailValido),
    check('password', 'El password debe ser de mínimo 6 caracteres').isLength({ min: 6 }),
    check('phone', 'El teléfono no es válido').isNumeric(),
    check('phone').custom(esPhoneValido),
    check('rol').custom(esRolValido),
    validation
], usersPost);

//Endpoint PUT
//Colocamos un ID para poder saber que tipo de usuario es
router.put('/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validation
], usersPut);

//Endpoint PATCH
router.patch('/', usersPatch);

//Endpoint DELETE
router.delete('/', usersDelete);

//Exportamos el método Router
module.exports = router;