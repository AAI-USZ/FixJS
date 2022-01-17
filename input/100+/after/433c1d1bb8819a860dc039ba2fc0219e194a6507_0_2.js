function(letter) {
        if(!this.hasGuessesLeft()) {
            throw new Error("You have no guesses left");
        }
    
        letter = letter.toLowerCase();

        if(!(letter >= 'a' && letter <= 'z')) {
            this.say("Invalid character " + letter + ". a-z only");
            return;
        }
        
        var guessedLetters = this.guessedLetters;
        if(guessedLetters.indexOf(letter) > -1) {
            this.say("You have already guessed the letter " + letter + ". Try again. " + this.getState());
        } else {      
            this.guessedLetters.push(letter);
            var charFound = this.addLetter(letter);
            this.updateState();
            
            if(charFound) {
                this.say("You guessed '" + letter + "' correctly! The word is now : " + this.getState());
            } else {
                this.totalWrong++;
                this.say("Character '" + letter + "' not found! You have got " + (this.maxGuesses - this.totalWrong) + " guesses left! " + this.getState());
            }
        }
    }