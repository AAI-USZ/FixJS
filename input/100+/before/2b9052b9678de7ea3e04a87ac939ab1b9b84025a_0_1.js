function ime_handleSpecialKey(code) {

      var immiReturn = true;

      switch (code) {

        case 32:
          // Space
          debug('space');
          _glue.sendString(' ');
          break;

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
            _glue.sendString(' ');
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
          debug('awww' + res);
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
          debug(res);
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

        // 
        case IMESpecialKey.MARK:
          if (_inputBuf.length !== 0) {
            _glue.sendString(SyllableUtils.arrayToString(_inputBuf));
            _inputBuf = [];
            _firstKana = '';
            _firstKanji = '';
            sendPendingSymbols();
          }
          if (_previousKeycode === IMESpecialKey.MARK && _candidateList[0] === "、") {
            _candidateList = IMEHalfWidthCharactorCandidateList;
          } else {
            _candidateList = IMEFullWidthCharactorCandidateList;
          }
          updateCandidateList(qNext.bind(self));
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

    }