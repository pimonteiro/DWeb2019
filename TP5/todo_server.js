var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')
var logger = require('logger').createLogger()

var {parse} = require('querystring')

var myBD = "todos.json"

var myServer = http.createServer((req,res)=>{
    var purl = url.parse(req.url,true)
    var query = purl.query
    var pathname = purl.pathname

    if(req.method == 'GET'){
        if(pathname == '/' || pathname == '/todos'){
            logger.info(req.method + " " + pathname)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            jsonfile.readFile(myBD, (err,data)=>{
                if(!err){
                    res.write(pug.renderFile('view/main_page.pug',{lista: data}))
                }
                else{
                    logger.error("Can't open database: " + err)
                    res.write(pug.renderFile('view/error.pug', {e: "Sorry, error on server-side.", q: "503"}))
                }
                res.end()
            })
        }
        else if(pathname == '/resources/w3.css'){
            logger.info(req.method + " " + pathname)
            res.writeHead(200,{'Content-Type': 'text/css'})
            fs.readFile('resources/w3.css', (err,data)=>{
                if(!err){
                    res.write(data);
                }
                else{
                    logger.error("Can't open w3.css file: " + err)
                }
                res.end()
            })
        }
        else if(pathname == '/resources/favicon.ico'){
            res.writeHead(200,{'Content-Type': 'image/x-icon'})
            fs.readFile('resources/favicon.ico', (err,data)=>{
                if(!err){
                    res.write(data)
                }
                else{
                    logger.error("Can't open favicon.ico file: " + err)
                }
                res.end()
            })
        }
        else{
            logger.warn(req.method + " " + pathname +" -> Wrong request")
        }
    }
    else if(req.method == 'POST'){
        if(pathname == '/addtodo'){
            logger.info(req.method + " " + pathname) 
            retrieveData(req, result =>{
                jsonfile.readFile(myBD, (err,lista)=>{
                    if(!err){
                        if(result["data"] == "" || result["desc"] == ""){
                            res.writeHead(302,{
                                'Location':'/todos',
                            })
                            res.end()
                        }
                        else{                        
                            lista.push(result)
                            jsonfile.writeFile(myBD,lista, err=>{
                                if(!err){
                                    logger.info("Database updated (added item)")
                                    res.writeHead(302,{
                                        'Location':'/todos',
                                    })
                                }
                                else{
                                    logger.error("Can't write on database: " + err)
                                    res.writeHead(503,{'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(pug.renderFile('view/error.pug', {e: "Sorry, error on server-side.", q: "503"}))
                                }
                                res.end()
                            })
                        }
                    }
                    else{
                        logger.error("Can't open database: " + err)
                        res.writeHead(503,{'Content-Type': 'text/html; charset=utf-8'})
                        res.write(pug.renderFile('view/error.pug', {e: "Sorry, error on server-side.",  q: "503"}))
                        res.end();
                    }
                })
            })
        }
        else if(pathname == '/remove'){
            logger.info(req.method + " " + pathname) 
            retrieveData(req,result=>{
                jsonfile.readFile(myBD, (err,lista)=>{
                    if(!err){
                        lista.splice(result["id"],1)
                        jsonfile.writeFile(myBD,lista, err=>{
                            if(!err){
                                logger.info("Database updated (removed item)")
                                res.writeHead(302,{
                                    'Location':'/todos',
                                })
                            }
                            else{
                                logger.error("Can't write on database: " + err)
                                res.writeHead(503,{'Content-Type': 'text/html; charset=utf-8'})
                                res.write(pug.renderFile('view/error.pug', {e: "Sorry, error on server-side.", q: "503"}))
                            }
                            res.end();
                        })
                    }
                    else{
                        logger.error("Can't open database: " + err)
                        res.writeHead(503,{'Content-Type': 'text/html; charset=utf-8'})
                        res.write(pug.renderFile('view/error.pug', {e: "Sorry, error on server-side.",  q: "503"}))
                        res.end();
                    }
                })
            })
        }
        else{
            logger.warn(req.method + " " + pathname +" -> Wrong request") 
        }
    }
    else{
        logger.warn(req.method + " " + pathname +" -> Wrong request")
    }
})

function retrieveData(req, callback){
    if(req.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        req.on('data', bloco =>{
            body += bloco.toString()
        })
        req.on('end', ()=>{
            callback(parse(body))
        })
    }
    else{
        logger.error("Wrong enconding: " + req.headers)
        callback("")
    }
}


myServer.listen(7777, ()=>{
    logger.info("Server started on port 7777")
})