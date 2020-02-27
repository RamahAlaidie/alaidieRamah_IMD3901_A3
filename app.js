const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server);

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/public/index.html');
});

//routes
app.get('/playerOne', function(req,res) {
    res.sendFile(__dirname + '/public/playerOne.html');
});

app.get('/playerTwo', function(req,res) {
    res.sendFile(__dirname + '/public/playerTwo.html');
});

socketIO.on('connection', function(socket){
    console.log(socket.id + ' - a user connected');

    //player 1 poss
    socket.on("p1PosX", function (data){
        //console.log("Recieving Position");
        //console.log(data);
        socketIO.sockets.emit('send1X', data);
    });

    socket.on("p1PosY", function (data){
        //console.log("Recieving Position");
        socketIO.sockets.emit('send1Y', data);
    });

    socket.on("p1PosZ", function (data){
        //console.log("Recieving Position");
        socketIO.sockets.emit('send1Z', data);
    });

    //player 2 pos
    socket.on("p2PosX", function (data){
        //console.log("Recieving Position");
        //console.log(data);
        socketIO.sockets.emit('send2X', data);
    });

    socket.on("p2PosY", function (data){
        //console.log("Recieving Position");
        socketIO.sockets.emit('send2Y', data);
    });

    socket.on("p2PosZ", function (data){
        //console.log("Recieving Position");
        socketIO.sockets.emit('send2Z', data);
    });

    //changing teams
    socket.on("p1Red", function (data){
        socketIO.sockets.emit('CRp1');
    });

    //changing teams
    socket.on("p2Red", function (data){
        socketIO.sockets.emit('CRp2');
    });

    //changing teams
    socket.on("p1Blue", function (data){
        socketIO.sockets.emit('CBp1');
    });

    //changing teams
    socket.on("p2Blue", function (data){
        socketIO.sockets.emit('CBp1');
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);