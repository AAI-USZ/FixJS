function checkWord(bw) {
    if (info.text.indexOf(bw) !== -1) {
      this.io.kick(info.from, 'You said a bad word! >:(');
    }
  }