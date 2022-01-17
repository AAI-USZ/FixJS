function analyzeNoun(wordObject) {
            var isNouny = false, count = 0, root = "", pos = [];
            isNouny = wordObject.syllables.every(function (syllable) {
                count += 1;
                if (count === 1) {
                    root = syllable.getText();
                    pos = syllable.getTags(['n', 'name', 'pro']);
                    return pos.length;
                }
                return syllable.hasTag(['ns1', 'ns2', 'ns3', 'ns4', 'ns5']);
            });
            if (isNouny) {
                wordObject.addTag(pos);
                wordObject.addRoot(root, pos);
            }
        }