function(type, automaticallyFormat, message, originalArguments) {
    // Are we configured to show this type?
    var shouldOutput = this._shouldOutputType(type),
        shouldRecord = this._shouldRecordType(type),
        hasOtherArguments, i, len, args, output, entry, prefix,
        outputPrefix, recordedPrefix;

    // If we're neither going to output nor record the message, then stop now.
    if (!(shouldOutput || shouldRecord)) return;

    // Do we have arguments other than 'message'?  (Remember that
    // 'originalArguments' contains the message here, too, hence the > 1.)
    hasOtherArguments = (originalArguments  &&  originalArguments.length > 1);

    // If we're automatically formatting and there is no message (or it is
    // not a string), then don't automatically format after all.
    if (automaticallyFormat  &&  (SC.none(message)  ||  (typeof message !== "string"))) {
      automaticallyFormat = NO;
    }

    // If we should automatically format, and the client specified other
    // arguments in addition to the message, then we'll call .fmt() assuming
    // that the message is a format string.
    if (automaticallyFormat) {
      if (hasOtherArguments) {
        args = [];
        for (i = 1, len = originalArguments.length;  i < len;  ++i) {
          args.push(originalArguments[i]);
        }
        message = message.fmt.apply(message, args);
      }
    }

    // If a message prefix was specified, use it.
    prefix = this.get('messagePrefix');
    if (prefix) message = prefix + message;

    if (shouldOutput) {
      outputPrefix = this.get('outputMessagePrefix');

      // We only want to pass the original arguments to _outputMessage() if we
      // didn't format the message ourselves.
      args = automaticallyFormat ? null : originalArguments;
      this._outputMessage(type, null, this._outputIndentationLevel, (outputPrefix ? outputPrefix + message : message), args);
    }

    // If we're recording the log, append the message now.
    if (shouldRecord) {
      recordedPrefix = this.get('recordedMessagePrefix');

      entry = {
        type:      type,
        message:   message ? (recordedPrefix ? recordedPrefix + message : message) : YES,
        timestamp: new Date()
      };

      // If we didn't automatically format, and we have other arguments, then
      // be sure to record them, too.
      if (!automaticallyFormat  &&  hasOtherArguments) {
        entry.originalArguments = originalArguments;
      }

      this._addRecordedMessageEntry(entry);
    }
  }