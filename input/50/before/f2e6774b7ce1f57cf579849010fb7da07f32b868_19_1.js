function(aCall) {
      if (aCall.state == 'incoming') {
        call = aCall;
        return true;
      }
      return false;
    }