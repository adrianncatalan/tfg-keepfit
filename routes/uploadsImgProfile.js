//Requerimos esta función del paquete express para movernos por rutas
const { Router } = require('express');

//Importamos check de express-validator
//Nos va permitir ejecutar todos los middlewares para verificar los campos, antes de disparar la ruta
const { check } = require('express-validator')

//Importamos nuestro archivo de validaciones
const { validation, validarImg } = require('../middleware')

const { uploadsImgProfile, updateImg } = require('../controllers');

const { coleccionesPermitidas } = require('../helpers/dbValidators');

//Creamos una constante que guarde las propiedades Router
const router = Router();

router.post('/', validarImg, uploadsImgProfile);

router.put('/:coleccion/:id', [
    validarImg,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['users', 'sessions', 'roles'])),
    validation
], updateImg);

//Exportamos el router
module.exports = router;