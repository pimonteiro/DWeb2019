var Obra = require('../models/obras')

module.exports.listar = query => {
    switch (true) {
        case query.compositor !== undefined:
          return Obra.find({ "compositor": query.compositor}).exec();
    
        case query.instrumento !== undefined:
          return Obra.aggregate([{$unwind: "$instrumentos.instrumento"},{$group: {_id: "$instrumentos.instrumento", obra: {$first: "$titulo"}, index: {$first: "$-id"}}},{$match:{"_id.designacao": query.instrumento}}])
        
        default:
          return Obra.find({},{"-id": 1, "titulo": 1, "compositor": 1, "tipo": 1}).exec();
      }
}

module.exports.listarUm = id => {
    return Obra.find({"-id": id}).exec()
}

module.exports.listarTipos = () => {
    return Obra.distinct("tipo").exec()
}

module.exports.listarQuantos = () => {
    return Obra.aggregate([{$unwind: "$instrumentos.instrumento"},{$group: {_id: "$titulo", index: {$first: "$-id"}, partituras: {$sum : 1}}}]).exec()
}