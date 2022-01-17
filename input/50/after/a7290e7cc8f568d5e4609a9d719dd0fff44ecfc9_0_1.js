function(message) {
      return message && (message.indexOf(this.getNick()) >= 0);
    }