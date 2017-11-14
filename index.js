const Hapi = require('hapi');
var routes = require('./src/routes');
var config = require('./src/config/setting');
var fs = require('fs');
let _ = require("underscore");
var path = require('path');
var inert=require('inert');
let dirName = path.join(__dirname, "/log/info");
if (!fs.existsSync(dirName)) {
    fs.mkdir(dirName);
}

dirName = path.join(__dirname, "/log/error");
if (!fs.existsSync(dirName)) {
    fs.mkdir(dirName);
}
var winston = require('winston'); require('winston-daily-rotate-file');
var transport = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '/log/info/info.log'),
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
});
var logger = new (winston.Logger)({
    transports: [transport],
    exitOnError: false
});
const server = new Hapi.Server({
    debug: {
        'request': ['error', 'uncaught']
    }
});
server.connection({
    host: "localhost",
    port: process.env.PORT || 3000,
    routes: {
        cors: true,
        files: {
                relativeTo: path.join(__dirname, '')
            }
    }
});
server.register([
        require('hapi-auth-jwt')
    ], (err) => {
    if (!err) {
        console.log('registered authentication provider');
    }
    server.auth.strategy('token', 'jwt', {
        key: config.jwt.key,
        verifyOptions: config.jwt.verifyOptions
    });    
    // We move this in the callback because we want to make sure that the authentication module has loaded before we attach the routes. It will throw an error, otherwise. 
    routes.forEach((route) => {
        console.log(`attaching ${route.path}`);
        server.route(route);
    });
});

server.register(inert, () => {});
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

server.start(function () {
    console.log(`Server running at: ${server.info.uri}`);
});
server.on('response', function (request) {
    logger.log('info', request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
});
server.on('request-error', function (request, err) {
    //console.log(err.data.stack);
    //console.log('Error response (500) sent for request: ' + request.id + ' because: ' + (err.trace || err.stack || err));
});
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
});
process.on('warning', (warning) => {
    console.warn(warning.name);    // Print the warning name
    console.warn(warning.message); // Print the warning message
    console.warn(warning.stack);   // Print the stack trace
});
exports.server = server;