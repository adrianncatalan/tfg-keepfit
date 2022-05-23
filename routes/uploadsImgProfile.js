//Requerimos esta función del paquete express para movernos por rutas
const { Router } = require('express');

//Importamos nuestro archivo de validaciones
const { validarImg } = require('../middleware')

const { uploadsImgProfile } = require('../controllers');

//Creamos una constante que guarde las propiedades Router
const router = Router();

router.post('/', validarImg, uploadsImgProfile);

//Exportamos el router
module.exports = router;