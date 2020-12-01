const mongoose = require('mongoose')
const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');
const {validationResult} = require('express-validator');
var mercadopago = require('mercadopago');

exports.crearProducto = async (req, res) =>{

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errors : errores.array()});
    }

    const {nombre} = req.body;

    try {
        const categoria = await Categoria.findById(req.body.categoria);
        if(!categoria){
            return res.status(400).json({ msg: 'La categoria no existe.' })
        }

        let producto = await Producto.findOne({nombre})
        if(producto){
            return res.status(400).json({msg: 'Ya existe un producto con ese nombre'});
        }

        producto = new Producto(req.body);
        await producto.save();

        return res.json({msg: 'Producto creado correctamente', producto})

    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
}

exports.listarProductos = async (req, res) => {

    try {
        const productos = await Producto.find();        
        res.json(productos);
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
}

exports.eliminarProducto = async (req, res) => {

    try {
        
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({msg: 'El producto no existe'})
        }

        //Verificar que la tarea exista
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            return res.status(400).json({msg: 'El producto no existe'});
        }

        await producto.remove();
        return res.json({msg: 'Producto eliminado correctamente'});

    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
}

exports.modificarProducto = async (req, res) =>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errors : errores.array()});
    }

    // Extraer el producto
    const {categoria} = req.body;

    try {
        //Validar id
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({msg : ' El producto no existe. '});
            }

        let producto = await Producto.findById(req.params.id).populate('categoria'); // con populate con traera ademas todos los campos referidos de la etiqueta donde se encuentra la tarea 
        if (!producto){
            return res.status(404).json({msg : ' El producto no existe. '}) ;
            }

        const categoriaExiste = await Categoria.findById(categoria);
        if (!categoriaExiste){
            return res.status(400).json({msg : ' La categoria no existe. '} ) ;
        }

        // Modificar producto
        producto = await Producto.findByIdAndUpdate(req.params.id,req.body, {new:true} );
        res.json({msg : ' Producto actualizado correctamente. ', producto }) ;

    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
}

exports.buscarProducto = async (req, res) => {

    try {
        
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({msg: 'El producto no existe'})
        }

        //Verificar que la tarea exista
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            return res.status(400).json({msg: 'El producto no existe'});
        }        
        return res.json(producto);

    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
}