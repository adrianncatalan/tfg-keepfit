const { request, response } = require('express');
const { uploadFile } = require('../../helpers/uploadFile');

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

module.exports.uploadImgProfile = uploadImgProfile;