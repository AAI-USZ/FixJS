function(callback, results) {
      // ensure signature timestamp is +/- 15 minutes
      var now = +new Date();
      try {
        var signInfo = results.frame.signature;
        var created = +Date.parse(signInfo.created);
        if(created < (now - 15*60) || created > (now + 15*60)) {
          throw new Error('[payswarm.verify] ' +
            'The message digital signature timestamp is out of range.');
        }
      }
      catch(ex) {
        callback(ex);
      }
    }