function(letter) {
        var charFound;
        for(var i in this.rawWord) {
            i = Number(i);
            if(this.rawWord[i] === letter) {
                this.arrayModifiedWord[i] = letter;

                charFound = true;
            }
        }
        return charFound;
    }