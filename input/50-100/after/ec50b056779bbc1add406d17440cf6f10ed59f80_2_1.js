function checkWord(bw) {
    if (info.text.toLowerCase().indexOf(bw.toLowerCase()) !== -1) {
      this.io.kick(info.from, this.config.message || 'You said a bad word! >:(');
    }
  }