const { request, response } = require('express');

const { uploadFile } = require('../../helpers/uploadFile');

const uploadsImgHeader = async (req = request, res = response) => {

    try {
        const nameFile = await uploadFile(req.files, undefined, 'imgHeader');

        res.json({ nameFile });

    } catch (msg) {

        res.status(400).json({ json });

    }
    
}

module.exports.uploadsImgHeader = uploadsImgHeader;