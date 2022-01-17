function(err, result) {
                if (err != null) {
                  return callback(new Error("Error saving \"" + filename + "\": " + err), err, result);
                } else if (((result != null ? result.statusCode : void 0) != null) === !201) {
                  return callback(new Error("Problem saving \"" + filename + "\": " + result));
                } else {
                  console.log("Saved \"" + filename + "\" to \"" + docId + "\"");
                  return callback(null, result);
                }
              }