function och_setupForCall(call, typeOfCall) {
    this.currentCall = call;

    this.lookupContact(call.number);

    CallScreen.update(call.number);

    CallScreen.render(typeOfCall);

    this.recentsEntry = {
      date: Date.now(),
      type: typeOfCall,
      number: call.number
    };

    // Some race condition can cause the call to be already
    // connected when we get here.
    if (call.state == 'connected')
      this.connected();

    call.addEventListener('statechange', this);
  }