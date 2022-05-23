//Requiero mis controladores
const usersGet = require('./users/usersGet');
const usersPost = require('./users/usersPost');
const usersPut = require('./users/usersPut');
const usersPatch = require('./users/usersPatch');
const usersDelete = require('./users/usersDelete');
const calculations = require('./calculations/calculations');
const updateName = require('./settings/updateName');
const updateSurname = require('./settings/updateSurname');
const updateAge = require('./settings/updateAge');
const updateGender = require('./settings/updateGender');
const updateHeight = require('./settings/updateHeight');
const updateWeight = require('./settings/updateWeight');
const updateWrist = require('./settings/updateWrist');
const updateFemur = require('./settings/updateFemur');
const updateEmail = require('./settings/updateEmail');
const updatePhone = require('./settings/updatePhone');
const updatePassword = require('./settings/updatePassword');
const bmi = require('./calculations/bmi');
const bone = require('./calculations/bone');
const muscleMass = require('./calculations/muscleMass');
const residualMass = require('./calculations/residualMass');
const fatMass = require('./calculations/fatMass');
const fatPercentage = require('./calculations/fatPercentage');
const uploadsImgProfile = require('./img/uploadsImgProfile');
const updateImgProfile = require('./img/updateImgProfile');
const uploadsImgHeader = require('./img/uploadsImgHeader');
const updateImgHeader = require('./img/updateImgHeader');

//Exporto mis controladores
module.exports = {
    ...usersGet,
    ...usersPost,
    ...usersPut,
    ...usersPatch,
    ...usersDelete,
    ...calculations,
    ...updateName,
    ...updateSurname,
    ...updateAge,
    ...updateGender,
    ...updateAge,
    ...updateHeight,
    ...updateWeight,
    ...updateWrist,
    ...updateFemur,
    ...updateEmail,
    ...updatePhone,
    ...updatePassword,
    ...bmi,
    ...bone,
    ...muscleMass,
    ...residualMass,
    ...fatMass,
    ...fatPercentage,
    ...uploadsImgProfile,
    ...updateImgProfile,
    ...uploadsImgHeader,
    ...updateImgHeader,
}