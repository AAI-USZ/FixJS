function(e) {
        if (started === true) {
            if (e.keyCode === 38) {
                // UP
                var position = players[myId].position;
                updatePlayerPosition(myId, position.x, position.y-5);
                sendPosition();
            } else if (e.keyCode === 40) {
                // DOWN
                var position = players[myId].position;
                updatePlayerPosition(myId, position.x, position.y+5);
                sendPosition();
            } else if (e.keyCode === 37) {
                // LEFT
                var position = players[myId].position;
                updatePlayerPosition(myId, position.x-5, position.y);
                sendPosition();
            } else if (e.keyCode === 39) {
                // RIGHT
                var position = players[myId].position;
                updatePlayerPosition(myId, position.x+5, position.y);
                sendPosition();
            }
        }
    }