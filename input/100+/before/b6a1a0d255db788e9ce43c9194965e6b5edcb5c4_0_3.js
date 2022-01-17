function (splitWord, words){
        if (this._candidateSelections[splitWord['middle']]){
            var i = words.indexOf(this._candidateSelections[splitWord['middle']]);
            if (i >= 0){
                return i;
            }
        }
        return 0;
    }