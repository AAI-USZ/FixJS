function ch_answer() {
    if (this.currentCall) {
      this.currentCall.answer();
    } else {
      this.disconnected();
    }
  }