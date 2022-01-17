function( socket ) {
    socket.emit('news', { hello: 'world' });

    // Events for ipad
    socket.on('questionChosen', function( question ) {
        console.log(data);
    });

    socket.on('reset', function() {
        socket.broadcast.emit('reset');
    });

    socket.on('close', function(data) {
        console.log(data);
        socket.broadcast.emit('close', {'q': data['q']});
    });

    socket.on('open', function(data) {
        console.log('Open question: ' + data['q']);
        socket.broadcast.emit('open', {'q': data['q']});
    });

    socket.on('changeRound', function(data) {
        console.log('Changing round to ' + data['round']);
        socket.broadcast.emit('changeRound', {'round': data['round']});
    });
}