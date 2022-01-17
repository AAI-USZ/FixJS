function(service, name) {
    name = name.split(':')[1];

    if (service === null) {
      callback(null, name);
      return;
    }

    if(service.__proto__ == Reference.prototype) {
      // Callback with channel reference merged with operations from GETCHANNEL
      callback(new Reference(self, ['channel', name, 'channel:' + name], service._operations), name);
    } else {
      callback(service, name);
    }

  }