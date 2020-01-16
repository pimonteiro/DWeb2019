var express = require('express');
var router = express.Router();
var axios = require('axios')

const link = "http://clav-api.dglab.gov.pt/api/entidades/"
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ"

router.get('/', function(req, res, next) {
  axios.get(link + '?apikey=' + apikey)
      .then(respose => {
        res.render('index',{lista: respose.data})
      })
      .catch(error => {
        res.render('error', {error: error})
      })
});


router.get('/:id', function(req, res, next) {
  axios.get(link + req.params.id + '?apikey=' + apikey)
      .then(response1 => {
        axios.get(link + req.params.id + '/intervencao/dono' + '?apikey=' + apikey)
          .then(response2 => {
            axios.get(link + req.params.id + '/intervencao/participante' + '?apikey=' + apikey)
              .then(response3 => {
                axios.get(link + req.params.id + '/tipologias' + '?apikey=' + apikey)
                  .then(response4 => {
                    res.render('entidade',{ent: response1.data, dono: response2.data, part: response3.data, tipos: response4.data})
                  })
                  .catch(error => {
                    res.render('error', {error: error})
                  }) 
              })
              .catch(error => {
                res.render('error', {error: error})
              })            })
          .catch(error => {
            res.render('error', {error: error})
          })    
      })
      .catch(error => {
        res.render('error', {error: error})
      })
});

module.exports = router;
