const mongoose = require('mongoose');
const Categoria = require('../models/Categoria');
const { validationResult } = require('express-validator');
const Producto = require('../models/Producto');

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

exports.eliminarCategoria = async (req, res) => {

    try {
        console.log(req.params.id)
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({msg: 'La categoria no existe'})
        }

        //Verificar que la tarea exista
        let categoria = await Categoria.findById(req.params.id);
        if(!categoria){
            return res.status(400).json({msg: 'La categoria no existe'});
        }

        
        //let productos = await Producto.remove({categoria : req.params.id});
        //
        //console.log(productos);

        await categoria.remove();
        await Producto.find({categoria : req.params.id}).remove();
        return res.json({msg: 'Categoria eliminada correctamente'});

    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
}

exports.modificarCategoria = async (req, res) =>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errors : errores.array()});
    }

    try {
        //Validar id
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({msg : ' La categoria no existe. '});
            }

        let categoria = await Categoria.findById(req.params.id);
        if (!categoria){
            return res.status(400).json({msg : ' La categoria no existe. '} ) ;
        }

        // Modificar categoria
        categoria = await Categoria.findByIdAndUpdate(req.params.id,req.body, {new:true} );
        res.json({msg : ' Categoria actualizada correctamente. ', categoria }) ;

    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
}