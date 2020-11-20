const mongoose = require('mongoose');

// Definimos el esquema
const ProductoSchema = mongoose.Schema({

    nombre : {
        type: String,
        required: true,
    },
    precio : {
        type: Number,
        required: true,
        trim: true
    },
    stock : {
        type: Number,
        required: true,
        trim: true
    },
    categoria : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Categoria',
        required : true
    },
    descripcion : {
        type: String,
        required: true,
        trim: true
    },
    imagen : {
        type : String ,    
        trim : true
    },
})

// Definimos el modelo Producto con el schema correspondiente
module.exports = mongoose.model('Producto', ProductoSchema);