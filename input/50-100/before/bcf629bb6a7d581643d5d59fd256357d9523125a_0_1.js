function sendPosition() {
        var jsonmsg = JSON.stringify( { type : 'move', id : myId, 'new-pos' : { 'x' : players[id].position.x, 'y' : players[id].position.y, 'o' : players[id].position.o } } );
        connection.send(jsonmsg);
    }