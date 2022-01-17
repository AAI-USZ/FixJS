function () {
    this.about = {
        name : "Hangman",
        description : "A game of hangman",
        author : "Alan Foster (http://www.alanfoster.me)"
    };

     this.triggers = [
        [/^!start/, this.tryCreateGame],
        [/^!guess (.*)/, this.tryGuess]
     ];
     
    this.help = [
        ["!start", "Creates a new game for this channelnel if one isn't already started"],
        ["!guess <letter(s)>", "Guess n letters on the current game being played."]
    ];
          
    this.currentGames = {};
    return this;
}