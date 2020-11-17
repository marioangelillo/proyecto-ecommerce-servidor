const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usuarioController = require('./controllers/usuarioController');
const authController = require('./controllers/authController');


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

module.exports = router ;