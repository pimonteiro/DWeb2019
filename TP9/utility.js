const fs = require('fs')
const mongoose = require('mongoose')
const argv = require('yargs').usage('Usage: $0 <command> [options]')
                             .command('import', 'Import File to mongoDB')
                             .example('$0 import -f foo.json -db foo -c foo')
                             .alias('f', 'file')
                             .nargs('f', 1)
                             .describe('f', 'file with database')
                             .nargs('c', 1)
                             .describe('c', 'collection name')
                             .alias('d','db')
                             .nargs('d',1)
                             .describe('d', 'database name')
                             .demandOption(['f','c','db'])
                             .help('h')
                             .alias('h', 'help').argv

mongoose.connect('mongodb://localhost:27017/' + argv.c, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        var anySchema = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed, _id: String}, { strict: false });
        var Any = mongoose.model(argv.db, anySchema)

        fs.readFile(argv.f, (err, data) => {
            if(!err){
                jsonData = JSON.parse(data)
                Any.insertMany(jsonData, {ordered: false}, function (err, sucess) {
                    if (err){
                        console.log(`Error code ${err.code}: ${err}.`)
                        console.log(`Inserted ${err.result.nInserted} entries.`)
                    }
                    else{
                        console.log(`Inserted ${sucess.length} entries.`)
                    }
                    process.exit()
                })
            }
            else{
                console.log(`Error: File ${argv.f} does not exist.`)
            }
        })
    })
    .catch((err) => {
        console.log(`Error: ${err}`)
        process.exit();
    })