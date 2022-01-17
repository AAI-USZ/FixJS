function() {
        // the game is finished ... just disconnect
        if(!askConfirmationBeforeLeavingPage){
            return
        }
        return "A game is active ... are you sure you want to leave ?";
        // should probably ask confirmation to user ??
    }