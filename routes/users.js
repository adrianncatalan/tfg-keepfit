//Requerimos esta función del paquete express para movernos por rutas
const { Router } = require('express');

//Importamos check de express-validator
//Nos va permitir ejecutar todos los middlewares para verificar los campos, antes de disparar la ruta
const { check } = require('express-validator')

//Importo mi función que valida los roles, emails, y otros campos que están permitidos en la base de datos para los usuarios
const { isRolValid, isEmailValid, isPhoneValid, existUserById } = require('../helpers/dbValidators')

//Los bloques de código son exportados a través del index del directorio controllers
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers');

//Los bloques de código son exportados a través del index del directorio middleware
const { validationJWT, validationRoles, validation } = require('../middleware');

//Creamos una constante que guarde las propiedades Router
const router = Router();

//Endpoint GET
router.get('/', usersGet);

//Endpoint POST
router.post('/', [
    check('name', 'El nombre no es válido').not().isEmpty(),
    check('surname', 'El apellido no es válido').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(isEmailValid),
    check('password', 'El password debe ser de mínimo 6 caracteres').isLength({ min: 6 }),
    check('phone', 'El teléfono no es válido').isNumeric(),
    check('phone').custom(isPhoneValid),
    check('rol').custom(isRolValid),
    validation
], usersPost);

//Endpoint PUT
//Colocamos un ID para poder saber que tipo de usuario es
router.put('/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(isRolValid),
    validation
], usersPut);

//Endpoint PATCH
router.patch('/', usersPatch);

//Endpoint DELETE
router.delete('/:id', [
    validationJWT,
    validationRoles,
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existUserById),
    validation
], usersDelete);

//Exportamos el método Router
module.exports = router;