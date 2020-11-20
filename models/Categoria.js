const mongoose = require('mongoose');

const CategoriaSchema = mongoose.Schema({

    nombre : {
        type: String,
        required: true,
        trim: true
    }
})

// Definimos el modelo Categoria con el schema correspondiente
module.exports = mongoose.model('Categoria', CategoriaSchema);