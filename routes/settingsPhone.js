//Requerimos esta función del paquete express para movernos por rutas
const { Router } = require('express');

//Importamos check de express-validator
//Nos va permitir ejecutar todos los middlewares para verificar los campos, antes de disparar la ruta
const { check } = require('express-validator')

//Importo mi función que valida los roles, emails, y otros campos que están permitidos en la base de datos para los usuarios
const { isRolValid, isEmailValid, isPhoneValid, existUserById } = require('../helpers/dbValidators')

//Los bloques de código son exportados a través del index del directorio controllers
const { updatePhone } = require('../controllers');

//Los bloques de código son exportados a través del index del directorio middleware
const { validation } = require('../middleware');

//Creamos una constante que guarde las propiedades Router
const router = Router();

//Endpoint POST
//Colocamos un ID para poder saber que tipo de usuario es
router.post('/:id/', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(isRolValid),
    validation
], updatePhone);

//Exportamos el método Router
module.exports = router;