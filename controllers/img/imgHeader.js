const { request, response } = require('express');

const path = require('path');

const uploadImgHeader = (req = request, res = response) => {

    if(!req.files || Object.keys(req.files).length){

    }

}

module.exports.uploadImgHeader = uploadImgHeader;