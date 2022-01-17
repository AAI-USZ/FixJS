function ma__recv_sliceSplice(msg) {
    var slice = this._slices[msg.handle];
    if (!slice) {
      unexpectedBridgeDataError('Received message about a nonexistent slice:',
                                msg.handle);
      return;
    }

    var addItems = msg.addItems, transformedItems = [], i, stopIndex;
    switch (slice._ns) {
      case 'accounts':
        for (i = 0; i < addItems.length; i++) {
          transformedItems.push(new MailAccount(this, addItems[i]));
        }
        break;

      case 'identities':
        for (i = 0; i < addItems.length; i++) {
          transformedItems.push(new MailSenderIdentity(this, addItems[i]));
        }
        break;

      case 'folders':
        for (i = 0; i < addItems.length; i++) {
          transformedItems.push(new MailFolder(this, addItems[i]));
        }
        break;

      case 'headers':
        for (i = 0; i < addItems.length; i++) {
          transformedItems.push(new MailHeader(slice, addItems[i]));
        }
        break;

      default:
        console.error('Slice notification for unknown type:', slice._ns);
        break;
    }

    // - generate slice 'onsplice' notification
    if (slice.onsplice) {
      try {
        slice.onsplice(msg.index, msg.howMany, transformedItems,
                       msg.requested, msg.moreExpected);
      }
      catch (ex) {
        reportClientCodeError('onsplice notification error', ex,
                              '\n', ex.stack);
      }
    }
    // - generate item 'onremove' notifications
    if (msg.howMany) {
      try {
        stopIndex = msg.index + msg.howMany;
        for (i = msg.index; i < stopIndex; i++) {
          var item = slice.items[i];
          if (slice.onremove)
            slice.onremove(item, i);
          if (item.onremove)
            item.onremove(item, i);
        }
      }
      catch (ex) {
        reportClientCodeError('onremove notification error', ex,
                              '\n', ex.stack);
      }
    }
    // - perform actual splice
    slice.items.splice.apply(slice.items,
                             [msg.index, msg.howMany].concat(transformedItems));
    // - generate item 'onadd' notifications
    if (slice.onadd) {
      try {
        stopIndex = msg.index + transformedItems.length;
        for (i = msg.index; i < stopIndex; i++) {
          slice.onadd(slice.items[i], i);
        }
      }
      catch (ex) {
        reportClientCodeError('onadd notification error', ex,
                              '\n', ex.stack);
      }
    }

    // - generate 'oncomplete' notification
    if (slice.oncomplete && msg.requested && !msg.moreExpected) {
      try {
        slice.oncomplete();
      }
      catch (ex) {
        reportClientCodeError('oncomplete notification error', ex,
                              '\n', ex.stack);
      }
      slice.oncomplete = null;
    }
  }