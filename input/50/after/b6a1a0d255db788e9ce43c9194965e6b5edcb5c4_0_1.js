function(word, candidate){
        //Seperate begining and trailing padding characters, punctuations etc. from whole word
        var splitWord = this._separatePadding(word);
        this._updateCandidateSelection(splitWord['middle'], candidate);
    }