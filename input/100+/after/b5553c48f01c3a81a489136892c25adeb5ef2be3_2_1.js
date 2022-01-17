function(data){
    var successRule = -1;
    var rule;
    var match;
    var length;
    var i;

    // Spin until there is no data left.
    while(data.length){

      // Compare each rule until one is found to match.
      for(i=0, l=_rules.length; i<l; ++i){
        rule = _rules[i];
        match = data.match(rule);
        if(match){
          break;
        }
      }

      // If a rule matched, tokenize!
      if(match){
        // If there was a listener for this token, call it now.
        if(_tokenListeners[_types[i]]){
          _tokenListeners[_types[i]](match[0]);
        }
        // Figure out the appropriate length to shorten the input string and shorten it.
        length = _lengths[i] || match[0].length;
        data = data.substr(length);

        // Remember some important data for the next loop.
        _this.lastCharacter = match[0][match[0].length-1];
        _this.lastToken = _types[i];
        _this.lastMatch = match[0];
      }
      else{
        // Remember some important data and march on.
        _this.lastCharacter = data[0];
        _this.lastMatch = null;
        _this.lastToken = null;
        data = data.substr(1);
      }
    }
  }