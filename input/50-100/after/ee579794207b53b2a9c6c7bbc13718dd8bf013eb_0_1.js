function handleTransform_getTermsCallback(terms) {

        var candidates = [];

        terms.forEach(function readTerm(term) {
          candidates.push([term.kanji, term.kana]);
        });

        if (!candidates.length) {
          candidates.push([_firstKanji, _firstKana]);
        } else {
          //_firstKanji = terms[0].kanji;
          //_firstKana = terms[0].kana;
        }

        _candidateList = candidates.slice();
        return;
      }