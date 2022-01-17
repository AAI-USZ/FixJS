function ime_handleNormalKey(code) {
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
      if (_previousKeycode !== IMESpecialKey.BACK && 
          !(String.fromCharCode(_previousKeycode) in IMEKeyMap)) {
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
    }