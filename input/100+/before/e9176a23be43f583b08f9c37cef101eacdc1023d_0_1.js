function(err, result) {
                if (err != null) {
                  callback(err);
                } else {
                  console.log("Saved \"" + filename + "\" to \"" + docId + "\"");
                  return callback(null, result);
                }
              }