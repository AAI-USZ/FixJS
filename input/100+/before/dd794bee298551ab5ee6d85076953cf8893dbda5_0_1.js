function(autoCorrect, dictSuggestion, phonetic, splitWord){
        var words = [];
        
        //1st Item: Autocorrect
        if (autoCorrect['corrected']){
            words.push(autoCorrect['corrected']);
        }
        
        //2nd Item: Classic Avro Phonetic
        this._addToArray(words, phonetic);
        
        //3rd Item: Dictionary Avro Phonetic
        
        //Update Phonetic Cache
        if(!this._phoneticCache[splitWord['middle'].toLowerCase()]){
            if (dictSuggestion.length > 0){
                this._phoneticCache[splitWord['middle'].toLowerCase()] = dictSuggestion.slice(0);
            }
        }
        //Add Suffix
        var dictSuggestionWithSuffix = this._addSuffix(splitWord);

        var sortedWords = this._sortByPhoneticRelevance(phonetic, dictSuggestionWithSuffix);
        for (i in sortedWords){
            this._addToArray(words, sortedWords[i]);
        }   
        
        var suggestion = {};
        
        //Is there any previous custom selection of the user?
        suggestion['prevSelection'] = this._getPreviousSelection(splitWord, words);
        
        //Add padding to all, except exact autocorrect
        for (i in words){
            if (autoCorrect['exact']){
                if (autoCorrect['corrected'] != words[i]){
                    words[i] = splitWord['begin'] + words[i] + splitWord['end'];
                }
            } else {
                words[i] = splitWord['begin'] + words[i] + splitWord['end'];   
            }
        }
        
        suggestion['words'] = words;
        
        return suggestion;
    }