//Requiero mi paquete para validar los roles de los usuarios
//Requiero mi middleware personalizado que utilizaré como segundo parámetro en mis endpoints o rutas
//Requiero mi archivo de validación JWT 
const validation = require('./validation/validation');
const validationJwt = require('./validationJwt/validationJwt');
const validationRoles = require('./validationRoles/validationRoles');

//Exporto los bloques de código
module.exports = {
    ...validation,
    ...validationJwt,
    ...validationRoles,
}