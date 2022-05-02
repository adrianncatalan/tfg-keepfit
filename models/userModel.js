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
    img: {
        type: String,
    },
    create_at: {
        type: Date,
        default: Date.now,
    },
})

module.exports = model('User', UserSchema);