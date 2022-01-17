function(letter) {
        if(!this.hasGuessesLeft()) {
            throw new Error("You have no guesses left");
         }
    
        letter = letter.toLowerCase();
        var intVal = letter.charCodeAt(0) - 97;
        if(!(intVal >= 0 && intVal <= 26)) {
            this.say("Invalid character " + letter + ". a-z only");
        }
        var guessedLetters = this.guessedLetters;
        if(guessedLetters[intVal]) {
            this.say("You have already guessed the letter " + letter + ". Try again");
        } else {
            this.say("You guessed " + letter);
            
            var charFound = false;
            
            for(var i in this.rawWord) {
                i = Number(i);
                if(this.rawWord[i] === letter) {
                    var str = this.modifiedWord;
                    this.modifiedWord = str.substr(0, i) + letter + str.substr(1 + i);
                    charFound = true;
                }
            }
            
            if(charFound) {
                this.say("You guessed correctly! The word is now : " + this.modifiedWord);
            } else {
                this.totalWrong++;
                this.say("Character not found! You have got " + (this.maxGuesses - this.totalWrong) + " guesses left! " + this.modifiedWord);
            }
            
            guessedLetters[intVal] = true;
        }
    }