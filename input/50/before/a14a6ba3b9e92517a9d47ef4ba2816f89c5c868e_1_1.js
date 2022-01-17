function (letter) {
        if (_.contains(rackLetters, letter)) {
            rackLetters = _.without(rackLetters, letter);
        } else {
            throw 'cannot swap, rack does not contain letter "' + letter + '"';
        }
    }