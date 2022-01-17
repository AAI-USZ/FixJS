function mb__cmd_doneCompose(msg) {
    if (msg.command === 'delete') {
      // XXX if we have persistedFolder/persistedUID, enqueue a delete of that
      // message and try and execute it.
      return;
    }

    var composer = new $mailcomposer.MailComposer(),
        wireRep = msg.state;
    var identity = this.universe.getIdentityForSenderIdentityId(
                     wireRep.senderId),
        account = this.universe.getAccountForSenderIdentityId(
                    wireRep.senderId);

    var body = wireRep.body;
    if (identity.signature) {
      if (body[body.length - 1] !== '\n')
        body += '\n';
      body += '-- \n' + identity.signature;
    }

    var messageOpts = {
      from: this._formatAddresses([identity]),
      subject: wireRep.subject,
      body: body
    };
    if (identity.replyTo)
      messageOpts.replyTo = identity.replyTo;
    if (wireRep.to && wireRep.to.length)
      messageOpts.to = this._formatAddresses(wireRep.to);
    if (wireRep.cc && wireRep.cc.length)
      messageOpts.cc = this._formatAddresses(wireRep.cc);
    if (wireRep.bcc && wireRep.bcc.length)
      messageOpts.bcc = this._formatAddresses(wireRep.bcc);
    composer.setMessageOption(messageOpts);

    if (wireRep.customHeaders) {
      for (var iHead = 0; iHead < wireRep.customHeaders.length; iHead += 2){
        composer.addHeader(wireRep.customHeaders[iHead],
                           wireRep.customHeaders[iHead+1]);
      }
    }
    composer.addHeader('User-Agent', 'Mozilla Gaia Email Client 0.1alpha');
    composer.addHeader('Date', new Date().toUTCString());
    // we're copying nodemailer here; we might want to include some more...
    var messageId =
      '<' + Date.now() + Math.random().toString(16).substr(1) + '@mozgaia>';

    composer.addHeader('Message-Id', messageId);

    if (msg.command === 'send') {
      var self = this;
      account.sendMessage(composer, function(err, badAddresses) {
        self.__sendMessage({
          type: 'sent',
          handle: msg.handle,
          err: err,
          badAddresses: badAddresses,
          messageId: messageId,
        });
      });
    }
    else { // (msg.command === draft)
      // XXX save drafts!
    }
  }