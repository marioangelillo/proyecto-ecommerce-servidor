const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usuarioController = require('./controllers/usuarioController');
const authController = require('./controllers/authController');
const categoriaController = require('./controllers/categoriaController');
const productController = require('./controllers/productController');


// Crear un usuarios
// api/usuarios/
router.post('/usuarios/',
[
    check('nombre','El nombre es obligatorio.').not().isEmpty(),
    check('apellido','El apellido es obligatorio.').not().isEmpty(),
    check('email',' El email es obligatorio.').not().isEmpty(),
    check('email',' Ingrese un email válido.').isEmail(),
    check('password',' El password es obligatorio.').not().isEmpty(),
    check('password',' El password debe ser mínimo de 6 caracteres.').isLength({ min: 6 })
    ],
    usuarioController.crearUsuario
);

// Autenticación de usuario
// /api/auth/
router.post('/auth/', [
    check('email','El email es obligatorio.').not().isEmpty(),
    check('email','Ingrese un email válido.').isEmail(),
    check('password','El password es obligatorio.').not().isEmpty()
],
authController.login
);

router.post('/admin/agregarcategorias',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
],
categoriaController.crearCategoria
);

router.get('/admin/listarcategorias',
    categoriaController.listarCategoria
);

router.delete('/admin/eliminarcategorias/:id',
categoriaController.eliminarCategoria
);

router.post('/admin/agregarproductos',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('stock', 'El stock es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria no es valida').isMongoId(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty()
],
productController.crearProducto
);

router.get('/admin/listarproductos',
    productController.listarProductos
);



module.exports = router ;