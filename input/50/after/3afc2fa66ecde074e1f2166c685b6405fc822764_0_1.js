function(user) {
        var player = new Player(user.id, this.physicsEngine);
        this.players[user.id] = player;
        return player;
    }