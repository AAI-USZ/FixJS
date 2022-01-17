function(opts, callback) {
      if (!callback) {
        throw new Error('setAttachment called without callback function.');
      }
      opts = opts || {};
      if (!opts['name']) {
        return callback("Attachment name not specified");
      }
      if (!opts['contentType']) {
        return callback("Attachment content type not specified");
      }
      if (!opts['body']) {
        return callback("Attachment name body not specified");
      }
      db.saveAttachement(this.id, opts, callback);
    }