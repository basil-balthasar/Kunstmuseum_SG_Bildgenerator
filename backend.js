//Debug optional use without serial connection
let useSerial = true;

//server requirements
var http = require('http');
var express = require("express");

//serialport requirements + parser setup
const SerialPort = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const parsers = SerialPort.parsers;
const parser = new ReadlineParser({ delimeter: "\r\n" });

//open serialport
if(useSerial == true){
    const port = new SerialPort.SerialPort({
        path: "/dev/cu.usbmodem141818101",
        baudRate: 9600,
        dataBits: 8,
        parity: "none",
        stopBits: 1,
        flowControl: false,
    });
    port.pipe(parser);
}

//open server on localhost
var app = express();
app.use(express.static("public"));
var server = app.listen(3000);

//io socket setup
var io = require('socket.io')(server);
io.sockets.on("connection", newConnection);
function newConnection(socket){
    console.log(socket.id);
}

//send serial data over io socket
if(useSerial == true){
    parser.on('data', function(data) {  
        console.log('Received data from port: ' + data);
        io.sockets.emit('data', data);
    });
}
