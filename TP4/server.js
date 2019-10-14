var http = require('http');
var url = require('url');
var fs = require('fs');


function getFile(path, type, res){
    fs.readFile(path, function(err, data){
        if(err){
            fs.readFile('404.html', function(err, data){
                if(err){
                    res.writeHead(400, {'Content-Type': 'text/html'});
                    res.write(err.message);
                    res.end();
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    res.end();
                }
            });    
        }
        else{
            res.writeHead(200, {'Content-Type': type});
            res.write(data);
            res.end();
        }
    });
}

var myserver = http.createServer(function(req,res){
    var q = url.parse(req.url,true);
    console.log("Pathname: " + q.pathname);

    if(q.pathname == '/' || q.pathname.includes('/index.html')){
        getFile('index.html', 'text/html', res);
    }
    else if(q.pathname == '/arq2html.xsl'){
        getFile('arqueo/arq2html.xsl', 'text/xsl', res);
    }
    else {
        var file_index = parseInt(q.pathname.slice(1));
        var fn = "arqueo/dataset/arq" + file_index + ".xml";
        console.log(fn);
        getFile(fn, 'text/xml', res);
    }


}).listen(7777);
console.log("Starting server on port 7777...");