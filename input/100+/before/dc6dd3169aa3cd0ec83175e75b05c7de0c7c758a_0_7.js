function mb__cmd_beginCompose(msg) {
    var req = this._pendingRequests[msg.handle] = {
      type: 'compose',
      // XXX draft persistence/saving to-do/etc.
      persistedFolder: null,
      persistedUID: null,
    };

    // - figure out the identity to use
    var account, identity;
    if (msg.mode === 'new' && msg.submode === 'folder')
      account = this.universe.getAccountForFolderId(msg.reference);
    else
      account = this.universe.getAccountForMessageSuid(msg.reference);

    identity = account.identities[0];

    this.__sendMessage({
      type: 'composeBegun',
      handle: msg.handle,
      identity: identity,
      subject: '',
      body: '',
      to: [],
      cc: [],
      bcc: [],
    });
  }