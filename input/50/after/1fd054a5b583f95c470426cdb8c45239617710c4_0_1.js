function() {
        // the game is finished ... just disconnect
        if(!gameIsOn){ // no game is playing ... no need to ask confirmation before leaving
            return
        }
        return $_("game.leave.gameIsActive.confirm")
        // should probably ask confirmation to user ??
    }