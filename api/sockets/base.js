var connectedUser = 0;

function socket_io(io) {
    io.on('connection', function(socket){
        console.log('a user connected');
        connectedUser++;
        console.log(connectedUser);
        socket.on('disconnect', () => {
            console.log('user disconnected');
            connectedUser--;
            io.sockets.emit('user connection', connectedUser);
            console.log(connectedUser);
        });
        socket.on('user connection', () =>{
            io.sockets.emit('user connection', connectedUser);
        });

    })    
}


module.exports = socket_io;