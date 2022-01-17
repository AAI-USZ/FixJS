function onPart(ch, nick, reason, message) {
    if (nick === this.nick) {
      console.log('Parted %s.', ch);
      this.unloadChannel(ch.toLowerCase());
    }
  }