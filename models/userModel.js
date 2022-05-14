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
    },
    gender: {
        type: String,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    bmi: {
        type: Number,
    },
    boneWeight: {
        type: Number,
    },
    muscleWeight: {
        type: Number,
    },
    residualWeight: {
        type: Number,
    },
    fatPercentage: {
        type: Number,
    },
    fatWeight: {
        type: Number,
    },
    wristDiameter: {
        type: Number,
    },
    femurDiameter: {
        type: Number,
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
    },
    phone: {
        type: Number,
        required: [true, 'El número de teléfono es obligatorio'],
        unique: true,
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