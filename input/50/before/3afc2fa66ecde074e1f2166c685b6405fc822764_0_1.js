function(user) {
        var player = new Player(id, this.physicsEngine);
        this.players[user.id] = player;
        return player;
    }