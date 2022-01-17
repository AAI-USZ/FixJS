function(error) {
        if (error) delete _this.docs[name];
        return callback(error, (!error ? doc : void 0));
      }