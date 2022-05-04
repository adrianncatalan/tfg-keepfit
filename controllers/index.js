//Requiero mis controladores
const usersGet = require('./users/usersGet');
const usersPost = require('./users/usersPost');
const usersPut = require('./users/usersPut');
const usersPatch = require('./users/usersPatch');
const usersDelete = require('./users/usersDelete');

//Exporto mis controladores
module.exports = {
    ...usersGet,
    ...usersPost,
    ...usersPut,
    ...usersPatch,
    ...usersDelete,
}