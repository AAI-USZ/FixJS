function(docName, callback) {
      var doc;
      if (this.state === 'stopped') {
        return callback('connection closed');
      }
      if (this.docs[docName]) {
        return callback(null, this.docs[docName]);
      }
      return doc = this.makeDoc(docName, {}, callback);
    }