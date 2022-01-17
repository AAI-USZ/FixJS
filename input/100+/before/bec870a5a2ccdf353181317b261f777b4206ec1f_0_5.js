function ime_sendPendingSymbols() {


      var bufStr = SyllableUtils.arrayToString(_inputBuf);

      debug('sending pending symbols: ' + bufStr);

      if (_keyMode === KeyMode.NORMAL) {
        _glue.sendPendingSymbols(bufStr);
        return;

      } else if (_keyMode === KeyMode.TRANSFORM) {

        if (_firstKanji.length === 0) {
          _keyMode = KeyMode.NORMAL;

        } else {
          _glue.sendPendingSymbols(bufStr, 0, _firstKanji.length, 'blue');
        }

        return;
      } else if (_keyMode === KeyMode.SELECT) {

        if (_firstKanji.length === 0) {
          _keyMode = KeyMode.NORMAL;

        } else {
          _glue.sendPendingSymbols(bufStr, 0, _firstKanji.length, 'green');
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
    }