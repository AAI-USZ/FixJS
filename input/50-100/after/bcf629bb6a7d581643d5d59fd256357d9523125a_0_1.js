function sendPosition() {
        var jsonmsg = JSON.stringify( { type : 'move', id : myId, 'new-pos' : { 'x' : players[myId].position.x, 'y' : players[myId].position.y, 'o' : players[myId].position.o } } );
        connection.send(jsonmsg);
    }