function(channel, user, word){
    this.channel = channel;
    this.user = user;
    
    // TODO array of char is better.
    this.rawWord = word;
    this.arrayModifiedWord = word.replace(/./g, "_").split("");
    
    this.guessedLetters = [];

    this.totalWrong = 0;
    this.maxGuesses = 6;
    
    this.updateState();

    return this;
}