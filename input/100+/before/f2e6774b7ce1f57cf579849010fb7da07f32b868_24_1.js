function ch_connected() {
    // When the call is connected the speaker state is reset
    // keeping in sync...
    this._syncSpeakerEnabled();

    this.screen.classList.remove('incoming');
    this.screen.classList.add('calling');
    this.statusView.innerHTML = '00:00';

    this.recentsEntry.type += '-connected';

    this._ticker = setInterval(function ch_updateTimer(self, startTime) {
      var elapsed = new Date(Date.now() - startTime);
      self.statusView.innerHTML = elapsed.toLocaleFormat('%M:%S');
    }, 1000, this, Date.now());
  }