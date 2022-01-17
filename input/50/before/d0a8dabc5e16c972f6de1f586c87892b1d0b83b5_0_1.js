function (event, data) {
      // Need to check for a result key. A Google upload can return a 404 if
      // the bucket does not exist, this is still treated as a success by the
      // form upload plugin.
      if (data.result) {
        this.lookupMetadata(data.key, data);
      } else {
        this._onUploadFail(event, data);
      }
    }