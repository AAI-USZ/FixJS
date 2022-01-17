function ime_handleReturn() {
      if (_keyMode === KeyMode.TRANSFORM) {
        if (_firstKana === 0) {
          return;
        }

        debug('handle return in transform mode');
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
    }