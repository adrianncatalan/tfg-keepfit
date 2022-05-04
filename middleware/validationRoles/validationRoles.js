//Requerimos el paquete de express para usar los métodos de la request y response
const { request, response } = require('express');

const validationRoles = (req = request, res = response, next) => {

    //Si es undefined, no se ha validado correctamente la petición
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol, sin validar el token primero'
        })
    }

    //Desestrucuturamos el rol y nombre
    const { rol, name } = req.usuario;

    //Establecemos una condición al rol
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no tiene permisos de administrador`
        });
    }

    //Si es administrador, se ejecuta el resto de código
    next();
}

//Exporto el bloque de código en frma de objeto
module.exports = {
    validationRoles,
}