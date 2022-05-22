const path = require('path');

const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, extensionesValidas = ['png', 'jpg', 'jpeg'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');

        const extension = nombreCortado[nombreCortado.length - 1];

        //Validar extensión
        if (!extensionesValidas.includes(extension)) {
            return reject('La extensión .' + extension + ' no es permitida')
        }

        const nombreTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta + '/' + nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return response.status(500).send(err);
            }
            resolve(nombreTemp);
            // console.log(path.join(__dirname, '../uploads/' + archivo.name));
        });
    })
}

module.exports.uploadFile = uploadFile;