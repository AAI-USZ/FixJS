function(filename, options, cb) {
      /*
          "options" contains the pub vars
          may also contain special items:
            __dir: path to look relative to
      */

      var err, res, _ref;
      _ref = this.runSync(filename, options), err = _ref[0], res = _ref[1];
      return cb(err, res);
    }