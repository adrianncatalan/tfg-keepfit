//Requerimos esta función del paquete express para movernos por rutas
const { Router } = require('express');

//Importamos check de express-validator
//Nos va permitir ejecutar todos los middlewares para verificar los campos, antes de disparar la ruta
const { check } = require('express-validator')

//Importamos nuestro archivo de validaciones
const { validation } = require('../middleware/validation/validation');

const {uploadImgHeader} = require('../controllers')

//Creamos una constante que guarde las propiedades Router
const router = Router();

router.post('/', uploadImgHeader);

//Exportamos el router
module.exports = router;