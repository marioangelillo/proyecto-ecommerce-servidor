const Categoria = require('../models/Categoria');
const { validationResult } = require('express-validator');

exports.crearCategoria = async (req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errors : errores.array()});
    } 

    try {

        categoria = new Categoria(req.body);

        await categoria.save()
        res.json({msg : 'Categoria creada correctamente', categoria})
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
}

exports.listarCategoria = async (req, res) => {

    try {

        const categorias = await Categoria.find() ;
        
        res.json(categorias)
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
}