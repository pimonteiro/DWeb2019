var mongoose = require('mongoose');

var personSchema = new mongoose.Schema({
    id: String,
    firstname: String,
    surname: String,
    movitavion: String,
    share: String
})

var prizeSchema = new mongoose.Schema({
    year: String,
    category: String,
    laureates: [personSchema]
})


module.exports = mongoose.model('prize', prizeSchema);