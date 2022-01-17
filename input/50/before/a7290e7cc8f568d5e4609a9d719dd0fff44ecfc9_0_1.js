function(message) {
      return message && (!!message.match(this.getNick()));
    }