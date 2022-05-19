//Requerimos mongoose
const { Schema, model } = require('mongoose');

//Creamos nuestro modelo de usuario
const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    surname: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
    },
    age: {
        type: Number,
        default: 0,
    },
    gender: {
        type: String,
        default: "None",
    },
    height: {
        type: Number,
        default: 0,
    },
    weight: {
        type: Number,
        default: 0,
    },
    bmi: {
        type: Number,
        default: 0,
    },
    boneWeight: {
        type: Number,
        default: 0,
    },
    muscleWeight: {
        type: Number,
        default: 0,
    },
    residualWeight: {
        type: Number,
        default: 0,
    },
    fatPercentage: {
        type: Number,
        default: 0,
    },
    fatWeight: {
        type: Number,
        default: 0,
    },
    wristDiameter: {
        type: Number,
        default: 0,
    },
    femurDiameter: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
    },
    phone: {
        type: Number,
        default: 0,
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
    },
    imgProfile: {
        type: String,
    },
    imgHeader: {
        type: String,
    },
    //Fecha de creación del usuario
    create_at: {
        type: Date,
        default: Date.now,
    },
    //Tipos de roles de los usuarios
    rol: {
        type: String,
        default: 'ADMIN_ROLE',
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    //El state nos permite saber si se ha eliminado un usuario (True: Existe - False: Eliminado)
    state: {
        type: Boolean,
        default: true,
    },
    //Nos permite saber si fue creado con google (True: Creado con google - Fals: Creado con el register)
    google: {
        type: Boolean,
        default: false,
    },
});

//Este método me permite crear una función y puedo seleccionar que campos se pueden visualizar
//Debe ser siempre una función normal, porque vamos a utilizar el this
UserSchema.methods.toJSON = function () {
    const { __v, create_at, _id, google, state, rol, ...user } = this.toObject();
    user.uid = _id; //Transformamos visualmente el _id por uid
    return user;
}

module.exports = model('User', UserSchema);