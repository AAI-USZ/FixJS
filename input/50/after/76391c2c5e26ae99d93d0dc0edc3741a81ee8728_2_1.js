function GameController(physicsEngine) {
        console.log('constructor called');
        this.players = {};

        if (! physicsEngine instanceof Engine) {
            throw physicsEngine + " is not of type Engine";
        }

        this.physicsEngine = physicsEngine;
    }