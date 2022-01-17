function queryDict_getTermsCallback(terms) {
        debug('queryDict getTermsCallback');

        var kanaStr = SyllableUtils.arrayToString(_inputBuf);

        if (terms.length !== 0) {
          _firstKanji = terms[0].kanji;
          _firstKana = terms[0].kana;
        } else {
          _firstKanji = kanaStr;
          _firstKana = kanaStr;
        }

        terms.forEach(function readTerm(term) {
          candidates.push([term.kanji, term.kana]);
        });

        // only one kana in buf
        if (_inputBuf.length === 1) {
          debug('Only one kana; skip other lookups.');

          if (!candidates.length) {
            candidates.push([kanaStr, kanaStr]);
          }

          _candidateList = candidates.slice();
          sendPendingSymbols();
          updateCandidateList(qNext.bind(self));
          return;
        }

        var __getSentenceCallback = function getSentenceCallback(sentence) {
          // sentence = [term, term]

          debug('getSentenceCallback:' + JSON.stringify(sentence));

          if (sentence.length !== 0) {

            var sentenceKana = '';
            var sentenceKanji = '';

            var i;

            for (i = 0; i < sentence.length; i++) {
              sentenceKanji += sentence[i].kanji;
              sentenceKana += sentence[i].kana;
            }

            var kanaStr = SyllableUtils.arrayToString(_inputBuf);

            // look for candidate that is already in the list
            var exists = candidates.some(function sentenceExists(candidate) {
              return (candidate[0] === sentenceKanji);
            });

            if (!exists) {
              candidates.push([sentenceKanji, sentenceKana]);
              _firstKanji = sentenceKanji;
              _firstKana = sentenceKana;
            }
          }


          // The remaining candidates doesn't match the entire buffer
          // these candidates helps user find the exact character/term
          // s/he wants
          // The remaining unmatched kanas will go through lookup
          // over and over until the buffer is emptied.
          i = Math.min(_dictMaxPredictLength, _inputBuf.length - 1);

          var ___findTerms = function lookupFindTerms() {
            debug('Lookup for terms that matches first ' + i + ' kanas.');

            var subBuf = _inputBuf.slice(0, i);

            _dict.getTerms(subBuf, function lookupCallback(terms) {
              terms.forEach(function readTerm(term) {
                candidates.push([term.kanji, term.kana]);
              });

              if (i === 1 && !terms.length) {
                debug('The first kana does not make up a word,' +
                  ' output the symbol.');
                candidates.push([kanaStr, kanaStr]);
              }

              if (!--i) {
                debug('Done Looking.');
                _candidateList = candidates.slice();
                sendPendingSymbols();
                updateCandidateList(qNext.bind(self));
                return;
              }

              ___findTerms();
              return;
            });
          };

          ___findTerms();
        };

        debug('Lookup for sentences that make up from the entire buffer');

        _dict.getSentence(_inputBuf, __getSentenceCallback);
      }