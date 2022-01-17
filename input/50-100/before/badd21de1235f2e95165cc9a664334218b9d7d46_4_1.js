function cm_init() {
    this.muteButton.addEventListener('mouseup', this.toggleMute.bind(this));
    this.keypadButton.addEventListener('mouseup', this.toggleKeypad.bind(this));
    this.speakerButton.addEventListener('mouseup',
                                    this.toggleSpeaker.bind(this));
    this.answerButton.addEventListener('mouseup',
                                    OnCallHandler.answer.bind(OnCallHandler));
    this.rejectButton.addEventListener('mouseup',
                                    OnCallHandler.end.bind(OnCallHandler));
  }