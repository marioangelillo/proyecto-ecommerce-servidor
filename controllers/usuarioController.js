const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');
const jwt = require ('jsonwebtoken');

exports.crearUsuario = async ( req , res ) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errors : errores.array()});
    }

    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El email ingresado ya pertenece a un usuario'});
        }

        usuario = new Usuario(req.body);

        await usuario.save();
        

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
            res.json({msg : ' Usuario creado correctamente! ', token, usuario});
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({msg: 'Hubo un error'});
    }
};

