function(message, folder, options, callback) {
    if (!callback)
      throw new Error('A callback must be provided; you are using the API ' +
                      'wrong if you do not.');
    if (!options)
      options = {};

    var handle = this._nextHandle++,
        composer = new MessageComposition(this, handle);

    this._pendingRequests[handle] = {
      type: 'compose',
      composer: composer,
      callback: callback,
    };
    var msg = {
      type: 'beginCompose',
      handle: handle,
      mode: null,
      submode: null,
      reference: null,
    };
    if (options.hasOwnProperty('replyTo') && options.replyTo) {
      msg.mode = 'reply';
      msg.submode = options.replyMode;
      msg.reference = options.replyTo.id;
      throw new Error('XXX replying not implemented');
    }
    else if (options.hasOwnProperty('forwardOf') && options.forwardOf) {
      msg.mode = 'forward';
      msg.submode = options.forwardMode;
      msg.reference = options.forwardOf.id;
      throw new Error('XXX forwarding not implemented');
    }
    else {
      msg.mode = 'new';
      if (message) {
        msg.submode = 'message';
        msg.reference = message.id;
      }
      else if (folder) {
        msg.submode = 'folder';
        msg.reference = folder.id;
      }
    }
    this.__bridgeSend(msg);
    return composer;
  }