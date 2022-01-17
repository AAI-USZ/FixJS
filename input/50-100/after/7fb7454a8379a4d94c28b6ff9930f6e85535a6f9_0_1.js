function(channel, user, word){
    this.channel = channel;
    this.user = user;
    
    // TODO array of char is better.
    this.rawWord = word;   
    this.modifiedWord = word.replace(/./g, "_");
    
    this.guessedLetters = new Array(26);

    this.totalWrong = 0;
    this.maxGuesses = 6;
    
    return this;
}