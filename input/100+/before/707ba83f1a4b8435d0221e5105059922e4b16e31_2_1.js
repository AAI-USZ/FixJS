function(obj, permissions, data) {
    var self = this;
    if (obj instanceof Socky.ChannelsCollection) {
      Socky.Utils.extend(this._channels, obj._channels);
    } else {
      var channel_name = obj;
      var existing_channel = this.find(channel_name);
      if (!existing_channel) {
        var channel = null;
        if (channel_name.indexOf("private-") === 0) {
          channel = new Socky.PrivateChannel(channel_name, this._socky, permissions);
        } else if (channel_name.indexOf("presence-") === 0) {
          channel = new Socky.PresenceChannel(channel_name, this._socky, permissions, data);
        } else {
          channel = new Socky.Channel(channel_name, this._socky);
        }
        this._channels[channel_name] = channel;
        return channel;
      }
    }
  }