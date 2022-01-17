function mb__cmd_beginCompose(msg) {
    var req = this._pendingRequests[msg.handle] = {
      type: 'compose',
      // XXX draft persistence/saving to-do/etc.
      persistedFolder: null,
      persistedUID: null,
    };

    // - figure out the identity to use
    var account, identity, folderId;
    if (msg.mode === 'new' && msg.submode === 'folder')
      account = this.universe.getAccountForFolderId(msg.refSuid);
    else
      account = this.universe.getAccountForMessageSuid(msg.refSuid);

    identity = account.identities[0];

    if (msg.mode === 'reply' ||
        msg.mode === 'forward') {
      var folderStorage = this.universe.getFolderStorageForMessageSuid(msg.refSuid);
      folderStorage.getMessageBody(msg.suid, msg.date, function(bodyInfo) {

      });
      return;
    }

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