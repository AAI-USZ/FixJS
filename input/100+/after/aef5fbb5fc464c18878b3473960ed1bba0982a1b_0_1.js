function(input) {
    var message,
        json;

    if (!input) {
      json = {};
    } else if (typeof input === 'string') {
      json = {};
      json.short_message = input;
    } else {
      json = input;
    }

    if (json._id) {
      throw Error('_id is not allowed');
    }

    if (!json.version) {
      json.version = '1.0';
    }
    if (!json.host) {
      json.host = os.hostname();
    }
    if (!json.timestamp) {
      json.timestamp = new Date().getTime() / 1000;
    }
    if (!json.facility) {
      json.facility = 'node.js';
    }
    if (!json.short_message) {
      json.short_message = 'Gelf Shortmessage';
    }
    message = JSON.stringify(json);

    self.emit('gelf.message', message);
  }