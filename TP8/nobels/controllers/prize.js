var Prize = require('../models/prize')

//Lista todos os premios, recolhendo apenas os campos year e catergoria
module.exports.listar = query => {
    return Prize
        .find({
            $and: [
                {$or: [{undefined: {$eq: query.categoria}}, {'category': query.categoria}]},
                {$or: [{undefined: {$eq: query.data}}, {'year': {$gte: query.data}}]}
            ]
        }, {category: 1, year: 1})
        .exec()
}

//Lista um premio
module.exports.listarUm = id => {
    return Prize
        .find({_id: id})
        .exec()
}

//Lista todas as categorias, sem repetiçoes
module.exports.listarCategorias = () => {
    return Prize
        .distinct("category")
        .exec()
}

module.exports.listarLaureados = () => {
    return Prize
        .aggregate([
            {$unwind: "$laureates"},
            {$group: 
                {_id: "$laureates",
                premios: 
                    {$push: 
                        {categoria: "$category", ano: "$year"}}}
            },
            {$project : 
                {_id: 
                    {motivation: 0, id: 0, share: 0}}}])
        .exec()
}