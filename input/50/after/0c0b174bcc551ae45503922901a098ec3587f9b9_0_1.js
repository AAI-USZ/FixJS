function readTerm(term) {
                if (_firstKana.length === 0) {
                  _firstKana = term.kana;
                  _firstKanji = term.kanji;
                }
                candidates.push([term.kanji, term.kana]);
              }