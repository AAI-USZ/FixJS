function ime_handleTransform() {
      debug('handleTransform');

      if (!_inputBuf.length) {
        debug('empty input buf, return');
        handleInputBuf();
        return;
      }

      // Send pending symbols to highlight `_firstKana`
      sendPendingSymbols();

      debug('firstTerm  ' + _firstKanji + ' ' + _firstKana);

      // get candidates by _firstKana
      var __getTermsCallback =
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
      };

      // only query `_firstKana`
      _dict.getTerms(SyllableUtils.arrayFromString(_firstKana),
                     __getTermsCallback);

      updateCandidateList(qNext.bind(self));
    }