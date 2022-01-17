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
      var folderStorage = this.universe.getFolderStorageForMessageSuid(
                            msg.refSuid);
      var self = this;
      folderStorage.getMessageBody(
        msg.refSuid, msg.refDate,
        function(bodyInfo) {
          if (msg.mode === 'reply') {
            var rTo, rCc, rBcc;
            // clobber the sender's e-mail with the reply-to
            var effectiveAuthor = {
              name: msg.refAuthor.name,
              address: bodyInfo.replyTo || msg.refAuthor.address,
            };
            switch (msg.submode) {
              case 'list':
                // XXX we can't do this without headers we're not retrieving,
                // fall through for now.
              case null:
              case 'sender':
                rTo = [effectiveAuthor];
                rCc = rBcc = [];
                break;
              case 'all':
                // No need to change the lists if the author is already on the
                // reply lists.
                //
                // nb: Our logic here is fairly simple; Thunderbird's
                // nsMsgCompose.cpp does a lot of checking that we should audit,
                // although much of it could just be related to its much more
                // extensive identity support.
                if (checkIfAddressListContainsAddress(bodyInfo.to,
                                                      effectiveAuthor) ||
                    checkIfAddressListContainsAddress(bodyInfo.cc,
                                                      effectiveAuthor)) {
                  rTo = bodyInfo.to;
                }
                // add the author as the first 'to' person
                else {
                  rTo = [effectiveAuthor].concat(bodyInfo.to);
                }
                rCc = bodyInfo.cc;
                rBcc = bodyInfo.bcc;
                break;
            }

            var referencesStr;
            if (bodyInfo.references) {
              referencesStr = bodyInfo.references.concat([msg.refGuid])
                                .map(function(x) { return '<' + x + '>'; })
                                .join(' ');
            }
            else {
              referencesStr = '<' + msg.refGuid + '>';
            }
            self.__sendMessage({
              type: 'composeBegun',
              handle: msg.handle,
              identity: identity,
              subject: $quotechew.generateReplySubject(msg.refSubject),
              // blank lines at the top are baked in
              body: $quotechew.generateReplyMessage(
                      bodyInfo.bodyRep, effectiveAuthor, msg.refDate,
                      identity),
              to: rTo,
              cc: rCc,
              bcc: rBcc,
              referencesStr: referencesStr,
            });
          }
          else {
            self.__sendMessage({
              type: 'composeBegun',
              handle: msg.handle,
              identity: identity,
              subject: 'Fwd: ' + msg.refSubject,
              // blank lines at the top are baked in by the func
              body: $quotechew.generateForwardMessage(
                      msg.refAuthor, msg.refDate, msg.refSubject,
                      bodyInfo, identity),
              // forwards have no assumed envelope information
              to: [],
              cc: [],
              bcc: [],
              // XXX imitate Thunderbird current or previous behaviour; I
              // think we ended up linking forwards into the conversation
              // they came from, but with an extra header so that it was
              // possible to detect it was a forward.
              references: null,
            });
          }
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
      references: null,
    });
  }