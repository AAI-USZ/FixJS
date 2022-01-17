function ch_end() {
    if (OnCallHandler.recentsEntry &&
       (OnCallHandler.recentsEntry.type.indexOf('-connected') == -1)) {
      OnCallHandler.recentsEntry.type += '-refused';
    }

    if (OnCallHandler.currentCall)
      OnCallHandler.currentCall.hangUp();

    // We're not waiting for a disconnected statechange
    // If the user touch the 'end' button we wants to get
    // out of the call-screen right away.
    OnCallHandler.disconnected();

  }