function(channel, user, mask, match) {
        var channelGame = this.getGame(channel);
        if(channelGame === undefined) {
            this.say("No game has been started for this channel. To begin one, use the '!start' command. ");
            return;
        }
                
        channelGame.guessLetter(match.charAt(0));
        if(channelGame.isComplete()){ 
            this.say("Well done! " + user + " + has won the game! The word was : " + channelGame.rawWord);
            delete this.currentGames[channel];
        } else if(!channelGame.hasGuessesLeft()) {
            this.say("Game Over! You have no remaining guesses! The word was : " + channelGame.rawWord);
            delete this.currentGames[channel];
        }
    }