function GameController(physicsEngine) {
        this.players = {};

        if (! physicsEngine instanceof Engine) {
            throw physicsEngine + " is not of type Engine";
        }

        this.physicsEngine = physicsEngine;
    }