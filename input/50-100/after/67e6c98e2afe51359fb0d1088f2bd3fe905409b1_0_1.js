function(exists) {
      if(!exists) {//try the next one
        if(lookupIndex >= packages.length) {
          cb && cb(false);
        }
        else {
          checkNextPath();
        }

      }
      else if (fs.statSync(filename).isDirectory()) {
        uri += '/' + self.main;
        lookupIndex--;
        checkNextPath();
      }
      else {
        cb && cb(true, filename);
      }
    }