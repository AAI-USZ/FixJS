function(target, msg) {
    if (this.username) {
      var instance = this;
      Channel.findOne({name: target.toLowerCase(), server: this.server, user: this.username}, function(err, channel) {
        if(!channel){
          var channel = new Channel({name: target.toLowerCase(), server: instance.server, user: instance.username});
        }
        channel.messages.push(msg);
        channel.save();
      });
    }
  }