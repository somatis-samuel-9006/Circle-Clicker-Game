var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var port = 8080;        //local

function saveScore(score){
    fs.writeFile('score.txt', score, function(err){
        if(err) throw err;
        console.log('saved');
    })
}
http.createServer(function(req, res){
    if(url.parse(req.url, true).pathname == '/exit'){
        process.exit();
    }else if(url.parse(req.url, true).pathname == '/'){
        req.url = '/Circle_Clicker.html';               //make req.url our html file
    }

    if(req.method === 'POST'){
        var score = 0;
        req.on('data', chunk => {
            score = chunk.toString().substr(6, chunk.length);    //"Score=1"
        });
        req.on('end', () => {
            saveScore(score);  
        })
        res.writeHead(200, {'Content-Type': 'text/html'});         //write head of whatever type
        return res.end();
        
    }

    var q = url.parse(req.url, true);       //make url object
    var filename = '.' + q.pathname;        //filename
    var type = 'text/html';

    if(q.pathname.endsWith('.css')){        //get the css file and load it
        type = 'text/css';
    }

    if(q.pathname.endsWith('.js')){
        type = 'text/Javascript';           //get js file and load it
    }

    fs.readFile(filename, function(err, data) {
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end('404 File Not Found Error');         //Throw error if file not found
        }

        res.writeHead(200, {'Content-Type': type});         //write head of whatever type

        res.write(data);
        return res.end();
    });
}).listen(port);