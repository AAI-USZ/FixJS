function makeMessage(aArgs) {
    aArgs = aArgs || {};

    var headerInfo = {
      id: null,
      suid: null,
      guid: Date.now() + Math.random().toString(16).substr(1) +
              '@mozgaia',
      author: null,
      date: null,
      flags: [],
      hasAttachments: false,
      subject: null,
      snippet: null,
    };
    var bodyInfo = {
      to: null,
      cc: null,
      bcc: null,
      replyTo: null,
      attachments: null,
      bodyText: null,
    };

    if (aArgs.inReplyTo) {
      var srcMsg = aArgs.inReplyTo;

      headerInfo.subject =
        (srcMsg.headerInfo.subject.substring(0, 4) == "Re: ") ?
          srcMsg.headerInfo.subject :
          ("Re: " + srcMsg.headerInfo.subject);
      if (aArgs.replyAll)
        bodyInfo.to = [srcMsg.headerInfo.author].concat(srcMsg.bodyInfo.to.slice(1));
      else
        bodyInfo.to = [srcMsg.headerInfo.author];
      headerInfo.author = srcMsg.bodyInfo.to[0];
    }
    else {
      headerInfo.subject = aArgs.subject || this.makeSubject();
      headerInfo.author = aArgs.from || this.makeNameAndAddress();
      bodyInfo.to = aArgs.to || this.makeNamesAndAddresses(aArgs.toCount || 1);
      if (aArgs.cc)
        bodyInfo.cc = aArgs.cc;
    }

    if (aArgs.age) {
      var age = aArgs.age;
      // start from 'now'
      var ts = this._clock || Date.now();
      if (age.minutes)
        ts -= age.minutes * 60 * 1000;
      if (age.hours)
        ts -= age.hours * 60 * 60 * 1000;
      if (age.days)
        ts -= age.days * 24 * 60 * 60 * 1000;
      if (age.weeks)
        ts -= age.weeks * 7 * 24 * 60 * 60 * 1000;
      headerInfo.date = ts;
    }
    else {
      headerInfo.date = this.makeDate().valueOf();
    }

    // use two subjects for the snippet to get it good and long.
    headerInfo.snippet = this.makeSubject() + ' ' + this.makeSubject();

    var rawBody = aArgs.rawBody || null,
        replaceHeaders = aArgs.replaceHeaders || null;

    // If a raw body was provided, try and take mailcomposer's logic out of
    // the picture by providing a stub body that we can replace after the
    // MIME structure has been built.  (Alternately, we could fall back to
    // Thunderbird's synthetic mime header stuff, but that is much more
    // limited...)
    if (rawBody) {
      bodyInfo.bodyText = '::BODYTEXT::';
    }
    else {
      bodyInfo.bodyText = headerInfo.snippet + '\n' +
        'This message is automatically created for you by robots.\n' +
        '\nThe robots may or may not be friendly.\n' +
        'They definitely do not know latin, which is why no lorax gypsum.\n' +
        '\nI am endeavouring to write more words now because scrolling turns' +
        ' out to be something important to test.  I know, I know.  You also' +
        ' are surprised that scrolling is important?  Who would have thunk?\n' +
        '\nI actually have some synthetic markov chain stuff lying around, do' +
        ' you think that would go better?  Perhaps?  Possibly?  Potentially?' +
        ' Pertinent?\n' +
        '\nTo-do:\n' +
        '1: Write more made-up text.\n' +
        '2: Cheat and just add more lines...\n' +
        '\n\n\n\n' +
        '3: ...\n' +
        '\nIt is a tiny screen we target, thank goodness!';
    }

    if (this._mode === 'info') {
      return {
        headerInfo: headerInfo,
        bodyInfo: bodyInfo,
      };
    }
    else { // 'rfc822'
      var composer = new $mailcomposer.MailComposer();
      var messageOpts = {
        from: this._formatAddresses([headerInfo.author]),
        subject: headerInfo.subject,
        body: bodyInfo.bodyText,
        to: this._formatAddresses(bodyInfo.to),
      };
      if (bodyInfo.cc)
        messageOpts.cc = this._formatAddresses(bodyInfo.cc);

      composer.setMessageOption(messageOpts);
      composer.addHeader('Date', new Date(headerInfo.date));
      composer.addHeader('Message-Id', '<' + headerInfo.guid + '>');

      // have it internally accumulate the data rather than using the stream
      // mechanism.
      composer._cacheOutput = true;
      var data = null;
      process.immediate = true;
      composer._processBufferedOutput = function() {
        data = this._outputBuffer;
      };
      composer._composeMessage();
      process.immediate = false;

      if (rawBody)
        data = data.replace('::BODYTEXT::', rawBody);
      if (replaceHeaders) {
        for (var headerName in replaceHeaders) {
          var headerValue = replaceHeaders[headerName],
              headerRE = new RegExp('^' + headerName + ': [^\r]+\r\n', 'm');
          data = data.replace(headerRE, headerName + ': ' + headerValue +
                              '\r\n');
        }
      }

      return {
        date: new Date(headerInfo.date),
        headerInfo: headerInfo,
        bodyInfo: bodyInfo,
        // XXX mailcomposer is tacking newlines onto the end of the message that
        // we don't want.  Ideally we want to fix mailcomposer...
        messageText: data.trimRight()
      };
    }
  }