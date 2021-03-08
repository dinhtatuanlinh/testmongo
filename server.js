var http = require('http');
var fs = require('fs');


var database = require('./libs/database');

var Port = normalizePort(process.env.PORT || 1000);
var db = 'phuc';
var companiesCollection = 'companies';
var paticipantCollection = 'clients';
var sessionCollection = 'session';
var args;

var Dich_vu = http.createServer(async function(req, res) {
    req.on('data', (chunk) => { receivedString += chunk; }); // nhận dữ liệu từ client gửi lên
    req.on('end', async() => {
        res.setHeader("Access-Control-Allow-Origin", '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        // add company
        if (req.url === '/getlist') {

            var companylist = await database.getlist(paticipantCollection, db);
            // console.log(companylist);
            companylist = JSON.stringify(companylist);
            res.end(companylist);
            return;
        }
        console.log('acb');
        res.end('app is working');
    })

})

Dich_vu.listen(Port, console.log(`Dịch vụ Dữ liệu đang thực thi tại địa chỉ: http://localhost:${Port}`));
Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof Port === 'string' ?
        'Pipe ' + Port :
        'Port ' + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = Dich_vu.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
}