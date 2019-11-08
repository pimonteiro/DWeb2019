var express = require('express');
var router = express.Router();
var Prizes = require('../controllers/prize')

/* GET users listing. */
router.get('/premios', function(req, res, next) {
    Prizes.listar(req.query)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
});

router.get('/premios/:idPremio', function(req, res, next) {
    Prizes.listarUm(req.params.idPremio)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
});

router.get('/categorias', function(req, res, next) {
    Prizes.listarCategorias()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

router.get('/laureados', function(req, res, next) {
    Prizes.listarLaureados()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})


module.exports = router;
