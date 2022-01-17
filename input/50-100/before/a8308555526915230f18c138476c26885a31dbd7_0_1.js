function placePlayer(x, y, socket) {
        var player = entityFactory.entity(x,y,clientNumber, "player");
        field.getNode(x,y).containedEntity = player; /*new player*/;
        player.currentBombCount = 0;
        player.maxBombCount = 1;
        player.blastRadius = 1;
        players[clientNumber] = player;
        socket.emit('identity',{entity:player});
        socket.emit('players',{players:players});
    }