const mongoose = require('mongoose');
const {validationResult} = require('express-validator');
var mercadopago = require('mercadopago');

exports.mercadopago = (req, res) => {

    mercadopago.configure({
        access_token: 'TEST-108414001950124-113020-ee705f933e4397bf75b5465c74858781-219736967'
    });
    var preference = {
        items: [
          {
            title: 'Test',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: 10.5
          }
        ]
      };
       
      mercadopago.preferences.create(preference)
      .then(function(response){
          res.send(response)
          //res.redirect(response.body.init_point)
      }).catch(function(error){
        console.error(error)
      })
}