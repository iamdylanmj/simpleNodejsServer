const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const logData = require('./logIns');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};
const emitter = new MyEmitter();
emitter.on('log', (message, fileName) => {
    logData(message, fileName);
});



const PORT = process.env.PORT || 8080;

const serveFile = async (filePath, res, contentType) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ?  'utf8': '');

        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;

        // res.writeHead(
        //     filePath.inlcudes('notfound.html') ? 404 : 200,
        //      {'content-type' : contentType});
        res.writeHead(200, {'content-type' : contentType });
        res.end(contentType === 'application/json' ? JSON.stringify(data) : data);

    } catch(err) {
        console.log(err);
        emitter.emit('log', `${err.name}\t${err.message}`, 'logInErro.txt');
        res.statusCode = 500;
        res.end();
    }
  
};

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    emitter.emit('log', `${req.url}\t${req.method}`, 'logInInfo.txt');


    const extention = path.extname(req.url);

    let contentType;

    switch(extention) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            // contentType = 'application/octet-stream';
            contentType = 'image/jpeg';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';                
    }


    let filePath; 
    if(contentType === 'text/html' && req.url === '/') {
        filePath = path.join(__dirname, 'index.html');
    } else if(contentType === 'text/html' && req.url.slice(-1) === '/') {
        filePath = path.join(__dirname, req.url, 'index.html');
    } else if(contentType === 'text/html'){
        filePath = path.join(__dirname, req.url );
    } else if(contentType === 'text/css'){
        filePath = path.join(__dirname, 'css', 'style.css');
    } else {
        filePath = path.join(__dirname, req.url);
    }

    if(!extention && req.url.slice(-1) !== '/') filePath += '.html';
   

    const existFile = fs.existsSync(filePath);

    if(existFile) {
        // please serve
        serveFile(filePath, res, contentType);
    } else {
        // either not found or redirected
        switch(path.parse(req.url).name) {
            case 'old-page':
                res.writeHead(301, {'Location' : './replaced/new-page.html'});
                res.end();
                break;
                
            case 'home':
                res.writeHead(301, {'Location' : './index.html'});
                res.end();
                break; 

            default:
                // serve 404 notfound
                serveFile(path.join(__dirname, 'features', 'notfound.html'), res, 'text/html');      

        }

       
    }
    
});

server.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});