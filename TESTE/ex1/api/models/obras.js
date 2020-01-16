var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PartituraSchema = new Schema({
    "-type": String,
    "-path": String,
    "-voz": String
})


const InstrumentoSchema = new Schema({
    "designacao": String,
    "partitura": PartituraSchema
})


const ObraSchema = new Schema({
    "_id": String,
    "titulo": String,
    "tipo": String,
    "compositor": String,
    "instrumentos": [InstrumentoSchema]
})


module.exports = mongoose.model('obras', ObraSchema);
