function(msg) {
    var req = this._pendingRequests[msg.handle];
    if (!req) {
      unexpectedBridgeDataError('Bad handle for compose begun:', msg.handle);
      return;
    }

    req.composer.senderIdentity = new MailSenderIdentity(this, msg.identity);
    req.composer.subject = msg.subject;
    req.composer.body = msg.body;
    req.composer.to = msg.to;
    req.composer.cc = msg.cc;
    req.composer.bcc = msg.bcc;
    // XXX attachments

    if (req.callback) {
      var callback = req.callback;
      req.callback = null;
      callback.call(null, req.composer);
    }
  }