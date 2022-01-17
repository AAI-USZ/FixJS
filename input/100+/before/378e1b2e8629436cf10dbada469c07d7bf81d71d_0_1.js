function(autoCorrect, dictSuggestion, phonetic, splitWord){
        var words = [];
        
        //1st Item: Autocorrect
        if (autoCorrect.length > 0){
            words.push(autoCorrect);
        }
        
        //2nd Item: Classic Avro Phonetic
        this._addToArray(words, phonetic);
        
        //3rd Item: Dictionary Avro Phonetic
        var sortedWords = this._sortByPhoneticRelevance(phonetic, dictSuggestion);
        for (i in sortedWords){
            this._addToArray(words, sortedWords[i]);
        }
        
        var suggestion = {};
        
        //Is there any previous custom selection of the user?
        suggestion['prevSelection'] = this._getPreviousSelection(splitWord, words);
        
        //Add padding to all
        for (i in words){
            words[i] = splitWord['begin'] + words[i] + splitWord['end'];
        }
        
        suggestion['words'] = words;
        
        return suggestion;
    }