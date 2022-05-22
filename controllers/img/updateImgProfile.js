const { request, response } = require('express');

const { uploadFile } = require('../../helpers/uploadFile');

const path = require('path');

const fileSystem = require('fs');

//Importamos nuestro modelo de user, lo colocamos en mayúscula porque vamos a instanciar el usuario
const User = require('../../models/userModel');

const updateImgProfile = async (req = request, res = response) => {

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

            return res.status(500).json({ msg: 'Falta validación para este apartado de bloque de código' });

    }
    
    //Limpiar imágenes del servidor
    if (modelo.imgProfile) {

        const pathImg = path.join(__dirname, '../../uploads/', coleccion + '/' + modelo.imgProfile);

        if (fileSystem.existsSync(pathImg)) {

            fileSystem.unlinkSync(pathImg);

        }

    }

    const nameFile = await uploadFile(req.files, undefined, 'users');

    modelo.imgProfile = nameFile;

    await modelo.save();

    res.json({ modelo });

}

module.exports.updateImgProfile = updateImgProfile;