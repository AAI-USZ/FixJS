function(name, data, callback) {
      var doc,
        _this = this;
      if (this.docs[name]) throw new Error("Doc " + name + " already open");
      doc = new Doc(this, name, data);
      this.docs[name] = doc;
      return doc.open(function(error) {
        if (error) delete _this.docs[name];
        return callback(error, (!error ? doc : void 0));
      });
    }