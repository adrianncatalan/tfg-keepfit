const { request, response } = require("express");

const validarImg = (req = request, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {

        return res.status(400).json({ msg: 'No hay archivos para subir - Validar IMG' });

        console.log(path.join(__dirname));
    }

    next();
}

module.exports = {

    validarImg,

}