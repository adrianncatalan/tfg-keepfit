const { request, response } = require('express');

const path = require('path');

const { v4: uuidv4 } = require('uuid');

const uploadImgProfile = (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        response.status(400).json({ msg: 'No hay archivos para subir' });
        console.log(path.join(__dirname));
        return;
    }



    const { archivo } = req.files;

    const nombreCortado = archivo.name.split('.');

    const extension = nombreCortado[nombreCortado.length - 1];

    //Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg'];

    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            msg: 'La extensión .' + extension + ' no es permitida'
        })
    }

    const nombreTemp = uuidv4() + '.' + extension;

    const uploadPath = path.join(__dirname, '../../uploads/' + nombreTemp);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return response.status(500).send(err);
        }
        res.send('Archivo subido a la ruta' + uploadPath);
        console.log(path.join(__dirname, '../../uploads/' + archivo.name));
    });
}

module.exports.uploadImgProfile = uploadImgProfile;