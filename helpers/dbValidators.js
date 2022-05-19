//Importo mi esquema de rol para usarlo en mi validación de roles
const Role = require('../models/rolModel');

//Importo mi esquema de User para usarlo en mi validación de de campos
const User = require('../models/userModel');

//Con esta función valido los roles de usuarios con mi base de datos
const isRolValid = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

//Con esta función valido el email de los usuarios con mi base de datos
const isEmailValid = async (email = '') => {
    //Verificar si el email esta registrado y mandamos un mensaje de error
    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
        throw new Error(`El email ${email} ya se encuentra registrado en la base de datos`);
    }
}

//Con esta función valido el número de teléfono de los usuarios con mi base de datos
const isPhoneValid = async (phone = '') => {
    //Verificar si el teléfono esta registrado y mandamos un mensaje de error
    const phoneExist = await User.findOne({ phone });
    if (phoneExist) {
        throw new Error(`El número de teléfono ${phone} ya se encuentra registrado en la base de datos`);
    }
}

//Con esta función valido si existe el usuario en mi base de datos
const existUserById = async (id) => {
    //Verifico si el correo existe
    const existeUsuario = await (User.findById(id));
    if (!existeUsuario) {
        throw new Error(`El Id ${id} no existe en la base de datos`);
    }
}

//Exportamos las funciones de validación
module.exports = {
    isRolValid,
    isEmailValid,
    isPhoneValid,
    existUserById,
}