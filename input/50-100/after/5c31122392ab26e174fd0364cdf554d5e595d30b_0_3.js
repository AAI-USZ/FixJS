function(exists) {
      if(!exists) {//try the next one
        if(lookupIndex >= packages.length) {
          cb(false);
        }
        else {
          checkNextPath();
        }
      }
      else if (fs.statSync(filename).isDirectory()) {
        //special case for directories
        //check is index.html available
        uri += '/' + self.index;
        lookupIndex--;
        checkNextPath();
      }
      else {
        cb(true, filename);
      }
    }