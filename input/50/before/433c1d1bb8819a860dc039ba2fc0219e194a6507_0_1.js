function(channel, user) { 
        var randomWord = this.getRandomWord();
        var game = new HangmanGame(channel, user, randomWord);
        game.say = this.say;
        return game;
    }