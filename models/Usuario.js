const mongoose = require('mongoose');

// Definimos el Schema
const UsuarioSchema = mongoose.Schema({
nombre : {
type : String ,
required : true ,
trim : true
},
apellido : {
type : String ,
required : true ,
trim : true
},
email : {
type : String ,
required : true ,
trim : true ,
unique : true
},
password : {
type : String ,
required : true ,
trim : true
},
created_at : {
type : Date ,
default : Date.now ()
}
});

// Definimos el modelo Usuario con el schema correspondiente
module.exports = mongoose.model('Usuario', UsuarioSchema);