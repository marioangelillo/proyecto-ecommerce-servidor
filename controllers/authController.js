const Usuario = require('../models/Usuario');
const bcryptjs = require ('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const compararPasswords = (pass1, pass2) =>{
    if(pass1 === pass2){
        return true;
    }else{
        return false;
    }
}

exports.login = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errors: errores.array() });
    }
    

    const {email, password} = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if(!usuario){
            return res.status(400).json({msg: 'El usuario o contraseña son incorrectos'});
        }

        const passCorrecto = await compararPasswords(password, usuario.password) 
        
        if(!passCorrecto){
            return res.status(400).json({msg: 'El usuario o contraseña son incorrectos'});
        }

        // Crear el payload
        const payload = {
            usuario : {
            id : usuario.id
            }
        };
        // Firmar JWT
        jwt.sign(payload, process.env.SECRET,{
            expiresIn : "180d" // 180 días
        }, (error, token) => {
            // En caso de error
            if (error) throw error ;
            // Mensaje de confirmación
            res.json({ token, usuario });
        });
        
        
    } catch (error) {
        console.error(error);
        res.status(400).json({msg: 'Hubo un error'});
    }
}