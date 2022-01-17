function(webProgress, request, stateFlags, status) {
      if (webProgress != docShell) {
        return;
      }

      if (stateFlags & Ci.nsIWebProgressListener.STATE_START) {
        this._seenLoadStart = true;
        sendAsyncMsg('loadstart');
      }

      if (stateFlags & Ci.nsIWebProgressListener.STATE_STOP) {
        sendAsyncMsg('loadend');

        if (status == Cr.NS_OK) {
          return;
        }

        // TODO See nsDocShell::DisplayLoadError for a list of all the error
        // codes (the status param) we should eventually handle here.
        sendAsyncMsg('error', {type: 'other'});
      }
    }