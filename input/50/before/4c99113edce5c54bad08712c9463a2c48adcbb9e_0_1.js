function checkForDepletion(g, gameRoom) {
        if (g.certainFish + g.actualMysteryFish <= 0) {
            g.depleted = true;
            endSimulation(gameRoom);
        }
    }