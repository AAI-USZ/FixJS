function (text) {
            if (text.match(/^[a-z\']/i)) {     // word
                return makeWord(text);
            }                                  // punctuation
            return makeTaggedString(text, [ analyzeSpace(text) ]);
        }