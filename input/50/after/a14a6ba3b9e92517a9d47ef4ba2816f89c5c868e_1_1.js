function (letter) {
        if (rackLetters.contains(letter)) {
            rackLetters.remove(letter);
        } else {
            throw 'cannot swap, rack does not contain letter "' + letter + '"';
        }
    }