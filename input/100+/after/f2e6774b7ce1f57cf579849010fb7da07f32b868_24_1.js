function ch_connected() {
    // Update UI properly.
    CallScreen.render('connected');
    CallScreen.startTimer();

    this.recentsEntry.type += '-connected';
  }