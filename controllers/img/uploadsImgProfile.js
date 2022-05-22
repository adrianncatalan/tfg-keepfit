const { request, response } = require('express');

const { uploadFile } = require('../../helpers/uploadFile');

const uploadsImgProfile = async (req = request, res = response) => {

    try {
        const nameFile = await uploadFile(req.files, undefined, 'users');

        res.json({ nameFile });

    } catch (msg) {

        res.status(400).json({ json });

    }
    
}

module.exports.uploadsImgProfile = uploadsImgProfile;