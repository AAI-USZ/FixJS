function ime() {

    // keep a local copy
    var self = this;

    // Glue contains some callback functions
    var _glue;

    // Query dict
    var _dict = null;

    // Enable IndexedDB
    var _enableIndexedDB = true;

    // Max length to predict
    var _dictMaxPredictLength = 20;

    // Input buffer
    // NOTICE `_inputBuf` only contains Hiragana
    var _inputBuf = [];
    // Candidate list to be displayed
    // candidate is [kanji, kana]
    var _candidateList = [];

    // First term info in candidate list
    // used for transforming
    var _firstKanji = '';
    var _firstKana = '';

    // Previous selected term info
    // used to generate suggestions
    var _selectedKanji = '';
    var _selectedKana = '';

    // Code of previous key pressed
    var _previousKeycode = 0;

    // Current keyboard
    var _currLayout = IMELayouts.JP;

    var KeyMode = {
      'NORMAL': 0,
      'TRANSFORM': 1,
      'SELECT': 2,
      'H2K': 3
    };
    var _keyMode = KeyMode.NORMAL;

    var _keyboardMode = IMEMode.FULL_HIRAGANA;


    // ** The following functions are compulsory functions in IME
    // and explicitly called in `keyboard.js` **
    //
    this.init = function ime_init(options) {
      //debug('init');
      _glue = options;
    };

    this.uninit = function ime_uninit() {
      if (_dict) {
        _dict.uninit();
        _dict = null;
      }
      self.empty();
    };

    this.click = function ime_click(keyCode) {
      //debug('click ' + keyCode);
      // push keyCode to working queue
      qPush(keyCode);
      qNext();
    };

    this.select = function ime_select(kanji, kana) {
      debug('select ' + kanji + ' ' + kana);
      _glue.sendString(kanji);

      _inputBuf.splice(0, kana.length);
      _selectedKanji = kanji;
      _selectedKana = kana;

      if (_inputBuf.length === 0) {
        _firstKana = '';
        _firstKanji = '';
        _keyMode = KeyMode.NORMAL;
      }

      // reset
      _previousKeycode = 0;

      qPush(0);
      qNext();
    };

    this.empty = function ime_empty() {
      debug('empty buffer.');
      _inputBuf = [];
      _selectedKanji = '';
      _selectedKana = '';
      _keyMode = KeyMode.NORMAL;
      _keyboardMode = IMEMode.FULL_HIRAGANA;
      _previousKeycode = 0;

      sendPendingSymbols();
      _qIsWorking = false;
      if (!_dict) {
        initDB();
      }
    };

    this.show = function ime_show(inputType) {
      debug('Show. Input type: ' + inputType);
      var layout = IMELayouts.JP;
      if (inputType === '' || inputType === 'text' ||
          inputType === 'textarea') {
        layout = _currLayout;
      }

      _glue.alterKeyboard(layout);
    };


    /** BEGIN QUEUE **/
    // A *queue* contains all keys pressed
    var _keyQueue = [];
    var _qIsWorking = false;

    var qPush = function queue_push(code) {
        _keyQueue.push(code);
    };

    // Start to pop key code from queue
    // All logic is in `handleSpecialKey` and `handleNormalKey`
    var qNext = function queue_next() {

      debug('start queue working');

      if (_qIsWorking) {
        debug('queue is working. wait');
        return;
      }

      _qIsWorking = true;

      if (!_dict) {
        debug('DB has not initialized, defer processing.');
        initDB(qNext.bind(self));
        return;
      }

      if (!_keyQueue.length) {
        debug('queue is empty');
        _qIsWorking = false;
        return;
      }

      // pop key code from queue
      var code = _keyQueue.shift();
      debug('queue pops key ' + String.fromCharCode(code));

      if (handleSpecialKey(code) || handleNormalKey(code)) {
      }

      // FIXME do we need this?
      // pass the key to IMEManager for default action
      // and run `qNext` again before exiting
      //_glue.sendKey(code);

      _qIsWorking = false;
      qNext();
    };
    /** END QUEUE **/

    var handleNormalKey = function ime_handleNormalKey(code) {
      var kana = String.fromCharCode(code);
      debug('handleNormalKey ' + kana);

      // set keymode
      _keyMode = KeyMode.NORMAL;

      // push kana directly if previoius key is NEXT
      if (_previousKeycode === IMESpecialKey.NEXT) {
        _previousKeycode = code;
        _inputBuf.push(kana);
        handleInputBuf();
        return 1;
      }

      // append new key code to the end of `_inputBuf`
      // and begin to deal with the new buf
      if (!(kana in IMEKeyMap)) {
        _glue.sendString(kana);
        return 1;
      }
      if (!(String.fromCharCode(_previousKeycode) in IMEKeyMap)) {
        _inputBuf.push(kana);

      } else {
        var prevKana = _inputBuf[_inputBuf.length - 1];
        var nextKeyInfo = getNextKeyInfo(prevKana, kana);

        if (nextKeyInfo[0]) {
          _inputBuf[_inputBuf.length - 1] = nextKeyInfo[1];
        } else {
          _inputBuf.push(nextKeyInfo[1]);
        }
      }

      handleInputBuf();
      _previousKeycode = code;
      return 1;
    };

    var handleSpecialKey = function ime_handleSpecialKey(code) {

      var immiReturn = true;

      switch (code) {

        case 0:
          // This is a select function operation.
          handleInputBuf();
          break;

        // cycle the IMEHiraganaCycleTable in reversal direction
        // Ex.
        //   ['あ', 'い', 'う', 'え', 'お', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ']
        //   is the cycle table of あ
        //   あ will be displayed when user click BACK
        //   while い is the current char
        case IMESpecialKey.BACK:
          var info = getPreviousKeyInfo(_inputBuf[_inputBuf.length - 1]);
          if (info[0]) {
            _inputBuf[_inputBuf.length - 1] = info[1];
          }
          handleInputBuf();
          break;

        case IMESpecialKey.PREVIOUS:
          if (_keyMode === KeyMode.NORMAL && _inputBuf.length > 0) {
            _keyMode = KeyMode.SELECT;
            handlePorN(_inputBuf);
            break;
          }

          if (_firstKana.length === 1) {
            _keyMode = KeyMode.NORMAL;
            handleInputBuf();
            break;
          }

          if (_keyMode === KeyMode.SELECT || _keyMode === KeyMode.TRANSFORM) {
            handlePorN(_inputBuf.slice(0, _firstKana.length - 1));

          } else if (_keyMode === KeyMode.H2K) {
            handleH2K(_inputBuf.slice(0, _firstKana.length - 1));
          }
          break;

        case IMESpecialKey.NEXT:
          if (_keyMode === KeyMode.NORMAL && _inputBuf.length > 0) {
            //_keyMode = KeyMode.SELECT;
            //handlePorN(_inputBuf.slice(0, 1));
            break;
          }

          if (_firstKana.length === _inputBuf.length) {
            _keyMode = KeyMode.NORMAL;
            handleInputBuf();
            break;
          }

          if (_keyMode === KeyMode.SELECT || _keyMode === KeyMode.TRANSFORM) {
            handlePorN(_inputBuf.slice(0, _firstKana.length + 1));
          } else if (_keyMode === KeyMode.H2K) {
            handleH2K(_inputBuf.slice(0, _firstKana.length + 1));
          }
          break;

        // Transform key
        case IMESpecialKey.TRANSFORM:
          if (_keyMode === KeyMode.TRANSFORM &&
              _previousKeycode !== IMESpecialKey.TRANSFORM) {
            break;
          }
          if (_inputBuf.length === 0) {
            break;
          }

          _keyMode = KeyMode.TRANSFORM;
          handleTransform();
          break;

        // Hiragana, full-width katakana and half-width katakana convertor
        case IMESpecialKey.H2K:
          if (_inputBuf.length === 0) {
            break;
          }

          if (_keyMode === KeyMode.H2K) {
            _keyMode = KeyMode.SELECT;
            handlePorN(_inputBuf.slice(0, _firstKana.length));
          } else if (_keyMode === KeyMode.NORMAL) {
            _keyMode = KeyMode.H2K;
            _firstKanji = SyllableUtils.arrayToString(_inputBuf);
            _firstKana = _firstKanji;
            handleH2K(_inputBuf.slice(0, _firstKana.length));
          } else if (_keyMode === KeyMode.TRANSFORM ||
                     _keyMode === KeyMode.SELECT) {
            _keyMode = KeyMode.H2K;
            handleH2K(_inputBuf.slice(0, _firstKana.length));
          }

          break;

        // 大 <-> 小
        // TODO num and alpha exception
        case IMESpecialKey.CASE_CHANGE:
          debug('case change');
          var last = _inputBuf[_inputBuf.length - 1];
          debug(last);
          var res = IMEHiraganaCaseTable[last];
          if (!res) {
            res = IMEFullKatakanaCaseTable[last];
          }
          if (!res) {
            res = IMEHalfKatakanaCaseTable[last];
            break;
          }
          if (!res) {
            break;
          }
          _inputBuf[_inputBuf.length - 1] = res;
          handleInputBuf();
          break;

        // Switch to basic layout
        case IMESpecialKey.BASIC_LAYOUT:
          alterKeyboard(IMELayouts.JP);
          break;

        // Switch to english layout
        case IMESpecialKey.EN_LAYOUT:
          alterKeyboard(IMELayouts.EN);
          break;

        // Switch to number layout
        case IMESpecialKey.NUM_LAYOUT:
          alterKeyboard(IMELayouts.NUM);
          break;

        // Default key event
        case KeyEvent.DOM_VK_RETURN:
          handleReturn();
          break;

        // Default key event
        case KeyEvent.DOM_VK_BACK_SPACE:
          handleBackspace();
          break;

        default:
          immiReturn = false;
          break;
      }


      if (immiReturn) {
        _previousKeycode = code;
        return 1;
      }

      _keyMode = KeyMode.NORMAL;
      _keyboardMode = IMEMode.FULL_HIRAGANA;

      // Ignore key code less than 0
      // except those special code above
      if (code <= 0) {
        debug('ignore meaningless key code <= 0');
        return 1;
      }

      return 0;

    };

    var alterKeyboard = function ime_alterKeyboard(layout) {
      _currLayout = layout;
      self.empty();
      _glue.alterKeyboard(layout);
    };

    var handleH2K = function ime_handleH2K(kanaArr) {
      debug('handleH2K ' + kanaArr);
      // Send pending symbols to highlight `_firstKanji`
      _firstKanji = SyllableUtils.arrayToString(kanaArr);
      _firstKana = SyllableUtils.arrayToString(kanaArr);
      sendPendingSymbols();

      updateCandidateList(qNext.bind(self));
    };

    var handlePorN = function ime_handlePorN(kanaArr) {
      debug('handlePorN ' + kanaArr);

      var __getTermsCallback1 = function handlePorN_getTermsCallback1(terms) {
        if (terms.length) {
          _firstKana = terms[0].kana;
          _firstKanji = terms[0].kanji;
        } else {
          _firstKana = SyllableUtils.arrayToString(kanaArr);
          _firstKanji = SyllableUtils.arrayToString(kanaArr);
        }
      };

      var __getTermsCallback2 = function handlePorN_getTermsCallback2(terms) {
        var candidates = [];

        terms.forEach(function readTerm(term) {
          candidates.push([term.kanji, term.kana]);
        });

        if (!candidates.length) {
          candidates.push([_firstKanji, _firstKana]);
        }

        _candidateList = candidates.slice();
        return;
      };

      // update _firstKana and _firstKanji
      _dict.getTerms(kanaArr, __getTermsCallback1);

      debug('firstTerm  ' + _firstKanji + ' ' + _firstKana);

      // Send pending symbols to highlight `_firstKana`
      sendPendingSymbols();

      // get candidates by _firstKana
      _dict.getTerms(SyllableUtils.arrayFromString(_firstKana),
                     __getTermsCallback2);

      updateCandidateList(qNext.bind(self));
    };

    var handleReturn = function ime_handleReturn() {
      if (_keyMode === KeyMode.TRANSFORM) {
        if (_firstKana === 0) {
          return;
        }

        debug('handle return in transform mode or select mode');
        // select first term
        _glue.sendString(_firstKanji);
        _inputBuf.splice(0, _firstKana.length);

        // query to generate first term
        queryDict();

        // do exactly like transforming
        handleTransform();
        return;

      } else if (_keyMode === KeyMode.H2K) {
        var mode = -1;
        if (_keyboardMode === IMEMode.FULL_HIRAGANA) {
          mode = IMEMode.HALF_KATAKANA;
        } else if (_keyboardMode === IMEMode.FULL_KATAKANA) {
          mode = IMEMode.FULL_HIRAGANA;
        } else if (_keyboardMode === IMEMode.HALF_KATAKANA) {
          mode = IMEMode.FULL_KATAKANA;
        }
        _glue.sendString(_getPossibleStrings(mode)[0]);
        _inputBuf = [];
        _candidateList = [];
        _keyboardMode = IMEMode.FULL_HIRAGANA;
        _keyMode = KeyMode.NORMAL;
        sendPendingSymbols();
        updateCandidateList(qNext.bind(self));

      } else if (_keyMode === KeyMode.SELECT) {
        if (_firstKana === 0) {
          return;
        }

        debug('handle return in transform mode or select mode');
        // select first term
        _glue.sendString(_firstKanji);
        _inputBuf.splice(0, _firstKana.length);

        // query to generate first term
        queryDict();

        handlePorN(_inputBuf.slice(0, _firstKana.length));
        return;

      } else {
        if (_firstKana.length > 0) {
          debug('first term ' + _firstKanji + ' ' + _firstKana);
          _glue.sendString(_firstKanji);
          _inputBuf.splice(0, _firstKana.length);
          handleInputBuf();

        } else {
          _glue.sendKey(KeyEvent.DOM_VK_RETURN);
        }
      }
    };

    var handleBackspace = function ime_handleBackspace() {
      debug('Backspace key');

      if (_inputBuf.length === 0) {
        _firstKana = '';
        _firstKanji = '';
        _candidateList = [];

        // pass the key to IMEManager for default action
        _glue.sendKey(KeyEvent.DOM_VK_BACK_SPACE);
        handleInputBuf();
        return;
      }

      _inputBuf.pop();
      handleInputBuf();
    };

    var handleTransform = function ime_handleTransform() {
      debug('handleTransform');

      if (!_inputBuf.length) {
        debug('empty input buf, return');
        handleInputBuf();
        return;
      }

      // Send pending symbols to highlight `_firstKanji`
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
          _firstKanji = terms[0].kanji;
          _firstKana = terms[0].kana;
        }

        _candidateList = candidates.slice();
        return;
      };

      // only query `_firstKana`
      _dict.getTerms(SyllableUtils.arrayFromString(_firstKana),
                     __getTermsCallback);

      updateCandidateList(qNext.bind(self));
    };

    // query, update pending symbols and candidate syllables
    // these three processes normally conbind as one
    var handleInputBuf = function ime_handleInputBuf() {
      queryDict();
    };

    // Query dict, result will be used in sendPendingSymbols
    //  and updateCandidateList
    var queryDict = function ime_queryDict() {

      var candidates = [];

      if (_inputBuf.length === 0) {
        if (_selectedKana.length) {
          debug('Buffer is empty; ' +
            'make suggestions based on select term.' + _selectedKanji);

          var kana = _selectedKana;
          var kanji = _selectedKanji;
          _selectedKana = '';
          _selectedKanji = '';
          _candidateList = [];
          _keyMode = KeyMode.NORMAL;

          // TODO
          _dict.getSuggestions(kana, kanji,
            function(suggestions) {
              suggestions.forEach(
                function suggestions_forEach(suggestion) {
                  candidates.push(
                    [suggestion.kanji.substr(kanji.length),
                     kana]);
                }
              );
              _candidateList = candidates.slice();
            }
          );

          sendPendingSymbols();
          updateCandidateList(qNext.bind(self));
          return;
        }

        debug('Buffer is empty; send empty candidate list.');
        _firstKana = '';
        _firstKanji = '';
        _candidateList = [];
        sendPendingSymbols();
        updateCandidateList(qNext.bind(self));
        return;
      }

      // reset
      _selectedKanji = '';
      _selectedKana = '';

      debug('Get term candidates for the entire buffer.');

      var __getTermsCallback = function queryDict_getTermsCallback(terms) {
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

          if (sentence.length !== 0 ) {

            _firstKanji = sentence[0].kanji;
            _firstKana = sentence[0].kana;

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
      };

      _dict.getTerms(_inputBuf, __getTermsCallback);

    };

    var _getPossibleStrings = function ime_getPossibleStrings(mode) {

      //
      var table;
      if (mode === IMEMode.FULL_HIRAGANA) {
        table = IMEFullKatakanaCycleTable;
      } else if (mode === IMEMode.FULL_KATAKANA) {
        table = IMEHalfKatakanaCycleTable;
      } else if (mode === IMEMode.HALF_KATAKANA) {
        table = IMEHiraganaCycleTable;
      }

      var i;
      var strFullKatakana = '';
      var strHalfKatakana = '';
      var strFullHiragana = '';
      var displayStr = '';

      for (i = 0; i < _firstKana.length; i++) {
        var info = getPosInfoByChar(_firstKana[i]);
        debug('get info ' + info[0] + '  ' + info[1]);
        if (info[0] === -1) {
          // FIXME see bug list 1
          return ['', '', '', ''];
        }
        displayStr += table[info[0]][info[1]];

        strFullHiragana += IMEHiraganaCycleTable[info[0]][info[1]];
        strFullKatakana += IMEFullKatakanaCycleTable[info[0]][info[1]];
        strHalfKatakana += IMEHalfKatakanaCycleTable[info[0]][info[1]];
      }

      return [displayStr, strFullHiragana, strFullKatakana, strHalfKatakana];
    };

    // Send pending symbols to display
    var sendPendingSymbols = function ime_sendPendingSymbols() {


      var bufStr = SyllableUtils.arrayToString(_inputBuf);

      debug('sending pending symbols: ' + bufStr);

      if (_inputBuf.length === 0) {
        _glue.sendPendingSymbols('');
        return;
      }

      if (_keyMode === KeyMode.NORMAL) {
        _glue.sendPendingSymbols(bufStr);
        return;

      } else if (_keyMode === KeyMode.TRANSFORM) {

        if (_firstKanji.length === 0) {
          _keyMode = KeyMode.NORMAL;

        } else {
          _glue.sendPendingSymbols(bufStr, 0, _firstKana.length, 'blue');
        }

        return;
      } else if (_keyMode === KeyMode.SELECT) {

        if (_firstKanji.length === 0) {
          _keyMode = KeyMode.NORMAL;

        } else {
          _glue.sendPendingSymbols(bufStr, 0, _firstKana.length, 'green');
        }

        return;
      } else if (_keyMode === KeyMode.H2K) {

        var strs = _getPossibleStrings(_keyboardMode);
        var candidates = [];
        _glue.sendPendingSymbols(bufStr, 0, strs[1].length, 'red');

        // candidate list is updated here
        // to avoide loop again in `handleInputBuf`
        // TODO reorder these three candidates
        candidates.push([_firstKana, _firstKana]);
        candidates.push([strs[2], _firstKana]);
        candidates.push([strs[3], _firstKana]);

        _candidateList = candidates.slice();
        return;
      }

      _glue.sendPendingSymbols(bufStr);
    };

    // Update candidate list
    var updateCandidateList = function ime_updateCandidateList(callback) {
      debug('update candidate list');

      _glue.sendCandidates(_candidateList);
      callback();
    };


    // Get json and init indexedDB if possible
    var initDB = function ime_initDB(readyCallback) {
      var dbSettings = {
        enableIndexedDB: _enableIndexedDB
      };

      if (readyCallback) {
        dbSettings.ready = readyCallback;
      }

      var jsonUrl = _glue.path + '/dict.json';
      _dict = new IMEngineDatabase('jskanji', jsonUrl);
      _dict.init(dbSettings);
    };

  }