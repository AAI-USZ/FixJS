function(splitWord){
        var tempList = [];
        
        var word = splitWord['middle'].toLowerCase();
        var len = word.length;
        
        var rList = [];
        if (this._phoneticCache[word]){
           rList = this._phoneticCache[word].slice(0);
        }
        
        if (len >= 2){
            for (var j = 1; j <= len; j++){
                var testSuffix = word.substr(j, len);
                
                var suffix = suffixDict[testSuffix];
                if (suffix){
                    var key = word.substr(0, word.length - testSuffix.length); 
                    if (this._phoneticCache[key]){
                        for (var k = 0; k < this._phoneticCache[key].length; k++){
                            var cacheItem = this._phoneticCache[key][k];
                            var cacheRightChar = cacheItem.substr(-1, 1);
                            var suffixLeftChar = cacheItem.substr(0, suffix);
                            if (this._isVowel(cacheRightChar) && this._isKar(suffixLeftChar)){
                                tempList.push(cacheItem + "\u09df" + suffix); // \u09df = B_Y
                            } else {
                                if (cacheRightChar == "\u09ce"){ // \u09ce = b_Khandatta
                                    tempList.push(cacheItem.substr(0,cacheItem.length - 1) + "\u09a4" + suffix); // \u09a4 = b_T
                                } else if (cacheRightChar == "\u0982"){ // \u0982 = b_Anushar
                                    tempList.push(cacheItem.substr(0,cacheItem.length - 1) + "\u0999" + suffix); // \u09a4 = b_NGA
                                } else {
                                    tempList.push(cacheItem + suffix);
                                }
                            }
                        }
                        
                        for (i in tempList){
                            rList.push(tempList[i]);
                        }
                    }
                }
            }
        }
        
        return rList;
    }