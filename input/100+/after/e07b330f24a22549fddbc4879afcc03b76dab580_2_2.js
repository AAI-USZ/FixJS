function(target, from, msg) {
    if (this.username) {
      var message = new Message({channel: target.toLowerCase(), server: this.server.toLowerCase(), linkedto: this.username, user: from, message: msg});
      message.save();
    }
  }