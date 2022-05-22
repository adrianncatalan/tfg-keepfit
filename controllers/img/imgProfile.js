const { request, response } = require('express');
const { model } = require('mongoose');
const { uploadFile } = require('../../helpers/uploadFile');
//Importamos nuestro modelo de user, lo colocamos en mayúscula porque vamos a instanciar el usuario
const User = require('../../models/userModel');

const uploadImgProfile = async (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        response.status(400).json({ msg: 'No hay archivos para subir' });
        console.log(path.join(__dirname));
        return;
    }

    try {
        const nameFile = await uploadFile(req.files, undefined, 'imgProfile');
        res.json({ nameFile });
    } catch (msg) {
        res.status(400).json({ json });
    }


}

const updateImg = async (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        response.status(400).json({ msg: 'No hay archivos para subir' });
        console.log(path.join(__dirname));
        return;
    }

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuaio con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Falta validación para este apartado de bloque de código' })
    }

    const nameFile = await uploadFile(req.files, undefined, 'imgProfile');

    modelo.imgProfile = nameFile;
console.log(modelo.save())
    // await modelo.save();

    res.json({ modelo });

    
}


module.exports = {
    uploadImgProfile,
    updateImg
}