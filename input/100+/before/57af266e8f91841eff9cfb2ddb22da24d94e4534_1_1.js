function (err, hashk_value) {
      if (err) {
        self.log.error('There was a problem with finding the value of: ' + link);
        //return cb(err);
        return cb(null, 'DONE');
      }

      if (hashk_value === null) {
        if (XRegExp.test(link, re) || XRegExp.test(link, reSSH)) {
          self.log.info(link.blue.bold + ' is a url');
          forkAndFix(link, cb);
        } else {
          self.log.info(link.blue.bold + ' is a folder');
          walkAndFix(null, link, 'OK', cb);//NOTE: LINK HERE IS the path!!!
        }
      } else {
        self.log.info(link.yellow.bold + ' Has already been processed!');
        return cb(null, "DONE");
      }
    }