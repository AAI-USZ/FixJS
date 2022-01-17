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
      refSuid: null,
      refDate: null,
    };
    if (options.hasOwnProperty('replyTo') && options.replyTo) {
      msg.mode = 'reply';
      msg.submode = options.replyMode;
      msg.refSuid = options.replyTo.id;
      msg.refDate = options.replyTo.date.valueOf();
    }
    else if (options.hasOwnProperty('forwardOf') && options.forwardOf) {
      msg.mode = 'forward';
      msg.submode = options.forwardMode;
      msg.refSuid = options.forwardOf.id;
      msg.refDate = options.forwardOf.date.valueOf();
      throw new Error('XXX forwarding not implemented');
    }
    else {
      msg.mode = 'new';
      if (message) {
        msg.submode = 'message';
        msg.refSuid = message.id;
      }
      else if (folder) {
        msg.submode = 'folder';
        msg.refSuid = folder.id;
      }
    }
    this.__bridgeSend(msg);
    return composer;
  }