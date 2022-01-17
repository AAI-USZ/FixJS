function(req, res) {
    var uploaderEmail = req.body.email;
    if (!auth.validateEmail(uploaderEmail)) {
      console.log("The user: " + uploaderEmail + " was not a valid email");
      res.writeHead(403);
      res.end();
      return;
    }

    var files = [];
    for (var i in req.files)  {
      files.push(req.files[i]);
    }
    
    console.log("Uploading unauthed file from: " + uploaderEmail);
    async.forEach(
      files
      , function(i, cb) {
        return magic.fileWrapper(i.path, function(err, type) {
          if (err) {
            console.log(err.message);
            cb(err);
            return;
          }

          return createImageUpload(i.path, type, { "emails" : [ { "value" : uploaderEmail } ] }, function(err, img) {
            if (err) {
              cb(err);
              return;
            }
      
            tags = req.body.tags;
            if (tags) {
              return setTagCollection(img.filehash, tags, false, function(err) {
                if (err) {
                  console.log("Failed to set tags.");
                  return cb(err);
                }

                return cb(undefined);
              });
            } 
            else  {
              return cb(undefined);
            }
          }); 
        });
      }
      , function(err) {
        if (err) {
          console.log("Could not upload file");
          return;
        }

        if (files.length == 1) {
          res.end('Successfully uploaded "' + files[0].name + '".\n');
        } 
        else {
          res.end('Successfully uploaded ' + files.length + ' files.\n');
        }
      }
    );
  }