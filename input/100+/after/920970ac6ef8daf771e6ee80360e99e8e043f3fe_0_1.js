function analyzeNoun(wordObject) {
            var root = '',
                syllCount = 1,
                syllMax = Math.min(wordObject.syllables.length, 4); // max length of root word
            // try each possible root (1-4 syllables)
            [1, 2, 3, 4].slice(0, syllMax).forEach(function (syllCount) {
                root = wordObject.getSyllable(0, syllCount).join('');
                console.log([wordObject.getText(), root, syllCount, syllMax].toString());
                if (!dict[root]) { return; }
                // root is good, look at part-of-speech
                ['n', 'name', 'pro'].forEach(function (pos) {
                    var suffixes = [], hasOnlyNounSuffixes = false;
                    if (!dict[root][pos]) { return; }
                    // root and part-of-speech is good, check suffixes
                    suffixes = wordObject.syllables.slice(syllCount);
                    hasOnlyNounSuffixes = suffixes.every(function (syllable) {
                        return syllable.hasTag(['ns1', 'ns2', 'ns3', 'ns4', 'ns5']);
                    });
                    if (hasOnlyNounSuffixes) {
                        wordObject.addTag(['n']);
                        wordObject.addRoot(root, [pos]);
                    }
                });
            });
        }