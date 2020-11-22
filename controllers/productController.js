const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');
const {validationResult} = require('express-validator');

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
        const productos = await Producto.find() ;        
        res.json(productos);
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
}