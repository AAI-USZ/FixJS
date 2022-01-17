function(uri, cb) {
  var lookupIndex = 0,
    packages = this.packages;

  (function checkNextPath() {
    var filename = path.join(process.cwd(), "client", packages[lookupIndex++], uri);

    path.exists(filename, function(exists) {
      if(!exists) {//try the next one
        if(lookupIndex >= packages.length) {
          cb && cb(false);
        }
        else {
          checkNextPath();
        }

      }
      else {
        cb && cb(true, filename);
      }
    }); 
  })();

}