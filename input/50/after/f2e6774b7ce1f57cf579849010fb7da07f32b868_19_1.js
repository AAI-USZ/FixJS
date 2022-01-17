function(aCall) {
      if (aCall.state == 'incoming' || aCall.state == 'dialing') {
        call = aCall;
        return true;
      }
      return false;
    }