var express = require('express');
var router = express.Router();
var Obra = require('../controllers/obras')

/* GET users listing. */
router.get('/obras', function(req, res, next) {
  Obra.listar(req.query)
    .then(data => res.jsonp(data))
    .catch(data => res.status(400).jsonp(data))
});

router.get('/obras/:id', function(req, res, next) {
  Obra.listarUm(req.params.id)
    .then(data => res.jsonp(data))
    .catch(data => res.status(400).jsonp(data))
})

router.get('/obras/tipos', function(req, res, next) {
  Obra.listarTipos()
    .then(data => res.jsonp(data))
    .catch(data => res.status(400).jsonp(data))
})

router.get('/obrasQuant', function(req, res, next) {
  Obra.listarQuantos()
    .then(data => res.jsonp(data))
    .catch(data => res.status(400).jsonp(data))
})

module.exports = router;
