function (splitWord, suggestionWords){
        var word = splitWord['middle'];
        var len = word.length;
        var selectedWord = '';
        
        if (this._candidateSelections[word]){
            selectedWord = this._candidateSelections[word];
        } else {
            //Full word was not found, try checking without suffix
            if (len >= 2){
                for (var j = 1; j < len; j++){
                    var testSuffix = word.substr(-j).toLowerCase();

                    var suffix = suffixDict[testSuffix];
                    if (suffix){
                        var key = word.substr(0, word.length - testSuffix.length);

                        if (this._candidateSelections[key]){

                            //Get possible words for key
                            var keyWord = this._candidateSelections[key];

                            var kwRightChar = keyWord.substr(-1);
                            var suffixLeftChar = suffix.substr(0, 1);

                            var selectedWord = '';

                            if (this._isVowel(kwRightChar) && this._isKar(suffixLeftChar)){
                                 selectedWord = keyWord + "\u09df" + suffix; // \u09df = B_Y
                             } else {
                                 if (kwRightChar == "\u09ce"){ // \u09ce = b_Khandatta
                                     selectedWord = keyWord.substr(0, keyWord.length - 1) + "\u09a4" + suffix; // \u09a4 = b_T
                                 } else if (kwRightChar == "\u0982"){ // \u0982 = b_Anushar
                                     selectedWord = keyWord.substr(0, keyWord.length - 1) + "\u0999" + suffix; // \u09a4 = b_NGA
                                 } else {
                                     selectedWord = keyWord + suffix;
                                 }
                             }
                             
                             //Save this referrence
                            this._updateCandidateSelection(word, selectedWord);
                            break;
                        }
                    }
                }
            }
        }
        
        var i = suggestionWords.indexOf(selectedWord);
        return (i < 0) ? i = 0 : i;
    }